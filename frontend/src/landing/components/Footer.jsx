import React from "react";
import Logo from "./Logo.jsx";

const footerColumns = [
  {
    title: "Platform",
    links: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Security", href: "#security" },
      { name: "Amenities", href: "#amenities" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Residents", href: "#how-it-works" },
      { name: "Security Gate", href: "#security" },
      { name: "Administration", href: "#sitemap" },
      { name: "Maintenance", href: "#features" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact", href: "#contact" },
      { name: "Help Desk", href: "#features" },
      { name: "Emergency Contacts", href: "#features" },
      { name: "Sitemap", href: "#sitemap" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#home" },
      { name: "Terms & Conditions", href: "#home" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#153e35] pt-12 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/70">
            Smart housing society management for safer, better-connected communities.
          </p>
        </div>

        {footerColumns.map(({ title, links }) => (
          <div key={title}>
            <p className="text-xs font-bold tracking-[.18em] text-[#e5c581]">
              {title.toUpperCase()}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {links.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    className="text-white/70 transition hover:text-white"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-white/50 sm:flex-row sm:justify-between lg:px-8">
          <span>© 2026 SmartSociety. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#home" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#home" className="hover:text-white transition">
              Terms & Conditions
            </a>
            <a href="#sitemap" className="hover:text-white transition">
              Sitemap
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
