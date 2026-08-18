import React from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";
import SitemapSection from "../components/SitemapSection.jsx";
import {
  Amenities,
  ComplaintCommunityTrust,
  Features,
  FinalCTA,
  HowRoles,
  ProblemSolution,
  Security,
  ValueStrip,
} from "../components/LandingSections.jsx";

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#fbfaf6] font-sans antialiased">
      <Navbar onNavigate={onNavigate} />
      <main className="overflow-x-clip pt-20">
        <Hero />
        <ValueStrip />
        <ProblemSolution />
        <Features />
        <HowRoles />
        <Security />
        <Amenities onNavigate={onNavigate} />
        <ComplaintCommunityTrust />
        <SitemapSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
