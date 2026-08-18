import React from "react";
import { Building2, ShieldCheck, Users, Wrench } from "lucide-react";

const groups = [
  {
    icon: Users,
    title: "Resident",
    items: [
      "Resident Dashboard",
      "Maintenance Bills",
      "Visitor Pass",
      "Complaints & Helpdesk",
      "Amenity Booking",
      "Notices & Community Polls",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security",
    items: ["Visitor Logs", "Pass Verification", "Security Alerts"],
  },
  {
    icon: Building2,
    title: "Administration",
    items: [
      "Resident & Flat Management",
      "Billing",
      "Helpdesk / Complaint Management",
      "Security Supervision",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance",
    items: ["Assigned Maintenance Work", "Complaint Status / Resolution"],
  },
];

export default function SitemapSection() {
  return (
    <section
      id="sitemap"
      className="border-t border-[#153e35]/10 bg-[#f4f5f0] py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[.18em] text-[#b8832f]">
            SITE MAP
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#153e35] sm:text-5xl">
            Explore SmartSociety by role.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            A clear overview of the tools and functions available to each part
            of your community.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map(({ icon: Icon, title, items }) => (
            <article
              key={title}
              className="rounded-2xl border border-[#153e35]/10 bg-white p-6 shadow-sm shadow-[#153e35]/[0.02] transition hover:-translate-y-1 hover:border-[#b8832f]/40 hover:shadow-xl hover:shadow-[#153e35]/5"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf3e9]">
                <Icon className="h-5 w-5 text-[#356152]" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-[#153e35]">
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-5 text-slate-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8832f]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
