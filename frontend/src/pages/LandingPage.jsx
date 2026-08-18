import React, { useEffect, useState } from 'react';
import Home from '../landing/pages/Home.jsx';
import AmenityDetail from '../landing/pages/AmenityDetail.jsx';

export default function LandingPage() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#amenity/')) {
      return { page: 'amenity', id: hash.replace('#amenity/', '') };
    }

    return { page: 'home', id: null };
  });

  const handleNavigate = (page, target) => {
    if (page === 'amenity') {
      setCurrentRoute({ page: 'amenity', id: target });
      window.location.hash = `amenity/${target}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentRoute({ page: 'home', id: null });
    if (target && target.startsWith('#')) {
      window.location.hash = target.replace('#', '');
      setTimeout(() => {
        const el = document.querySelector(target);
        if (!el) {
          return;
        }

        const navHeight = 80;
        const top =
          el.getBoundingClientRect().top +
          window.pageYOffset -
          (target === '#home' ? 100 : navHeight);

        window.scrollTo({
          top: target === '#home' ? 0 : Math.max(0, top),
          behavior: 'smooth',
        });
      }, 60);
      return;
    }

    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#amenity/')) {
        setCurrentRoute({ page: 'amenity', id: hash.replace('#amenity/', '') });
        return;
      }

      if (currentRoute.page === 'amenity' && (!hash || !hash.startsWith('#amenity/'))) {
        setCurrentRoute({ page: 'home', id: null });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute.page]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = [...document.querySelectorAll('main section')];
    const targets = [
      ...document.querySelectorAll(
        '.hero-copy, .hero-media, main section article, main section .grid > div:not(.grid), main section .motion-card'
      ),
    ];

    sections.forEach((section) => section.classList.add('scroll-reveal'));
    targets.forEach((target, index) => {
      target.classList.add('scroll-reveal');
      target.style.setProperty('--reveal-delay', `${Math.min((index % 6) * 70, 350)}ms`);
    });

    const allTargets = [...new Set([...sections, ...targets])];
    if (reduceMotion || !('IntersectionObserver' in window)) {
      allTargets.forEach((target) => target.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px' }
    );

    allTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [currentRoute]);

  if (currentRoute.page === 'amenity' && currentRoute.id) {
    return <AmenityDetail amenityId={currentRoute.id} onNavigate={handleNavigate} />;
  }

  return <Home onNavigate={handleNavigate} />;
}
