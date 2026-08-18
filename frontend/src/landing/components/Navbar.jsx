import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import Logo from "./Logo.jsx";

export default function Navbar({ onNavigate, isDetailPage = false }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(isDetailPage ? "amenities" : "home");

  const links = [
    ["Home", "#home"],
    ["Features", "#features"],
    ["How It Works", "#how-it-works"],
    ["Security", "#security"],
    ["Amenities", "#amenities"],
    ["Contact", "#contact"],
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (isDetailPage && onNavigate) {
      onNavigate("home", href);
      return;
    }

    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const navbarHeight = 80;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - (targetId === "home" ? 100 : navbarHeight);

      window.scrollTo({
        top: targetId === "home" ? 0 : Math.max(0, offsetPosition),
        behavior: "smooth",
      });
      window.history.pushState(null, "", href);
      setActiveSection(targetId);
    }
  };

  useEffect(() => {
    if (isDetailPage) {
      setActiveSection("amenities");
      return;
    }

    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection("home");
        return;
      }

      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;

      if (isBottom) {
        setActiveSection("contact");
        return;
      }

      const sectionIds = [
        "home",
        "features",
        "how-it-works",
        "security",
        "amenities",
        "contact",
      ];

      const sections = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.getBoundingClientRect().top + window.pageYOffset } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.top - b.top);

      const scrollPosition = window.scrollY + 180;
      let current = "home";

      for (const section of sections) {
        if (scrollPosition >= section.top) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDetailPage]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[#153e35]/10 bg-[#fbfaf6]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          aria-label="SmartSociety home"
          className="cursor-pointer"
        >
          <Logo />
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium xl:flex">
          {links.map(([label, href]) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={label}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive
                    ? "font-semibold text-[#153e35]"
                    : "text-slate-600 hover:text-[#153e35]"
                }`}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full bg-[#153e35] transition-all duration-200 ${
                    isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="text-sm font-semibold text-[#153e35] transition hover:text-[#b8832f]"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-[#153e35] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#205448]"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-1 text-[#153e35] hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-[#153e35]/10 bg-[#fbfaf6] px-5 py-4 shadow-lg md:hidden">
          {links.map(([label, href]) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={label}
                onClick={(e) => {
                  setOpen(false);
                  handleNavClick(e, href);
                }}
                href={href}
                className={`block py-2.5 text-sm transition-colors ${
                  isActive
                    ? "border-l-2 border-[#153e35] pl-2 font-semibold text-[#153e35]"
                    : "font-medium text-slate-700 hover:text-[#153e35]"
                }`}
              >
                {label}
              </a>
            );
          })}
          <div className="mt-4 flex gap-3 border-t border-[#153e35]/10 pt-4">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-[#153e35]"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="rounded-full bg-[#153e35] px-4 py-2 text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
