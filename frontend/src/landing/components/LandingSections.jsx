import React from "react";
import { Link } from "react-router";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ClipboardList,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { features, roles } from "../data/content.js";

export const SectionTitle = ({ eyebrow, title, copy, dark = false }) => (
  <div className="max-w-2xl">
    <p
      className={`text-xs font-bold tracking-[.18em] ${
        dark ? "text-[#e5c581]" : "text-[#b8832f]"
      }`}
    >
      {eyebrow}
    </p>
    <h2
      className={`mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl ${
        dark ? "text-white" : "text-[#153e35]"
      }`}
    >
      {title}
    </h2>
    {copy && (
      <p className={`mt-4 leading-7 ${dark ? "text-white/70" : "text-slate-600"}`}>
        {copy}
      </p>
    )}
  </div>
);

export function ValueStrip() {
  const valueItems = [
    [Users, "Residents", "Everyday community services and requests."],
    [ShieldCheck, "Security", "Visitor verification and digital gate logs."],
    [Building2, "Administration", "Society operations, billing, and notices."],
    [Wrench, "Maintenance", "Assigned service request management."],
  ];

  return (
    <section className="border-y border-[#153e35]/10 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:py-8 lg:px-8">
        <p className="mb-6 font-display text-2xl font-bold text-[#153e35]">
          Everything your society needs, connected in one place.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {valueItems.map(([Icon, title, desc]) => (
            <div
              key={title}
              className="flex min-h-[92px] gap-3 rounded-xl border border-[#153e35]/10 bg-[#fbfaf6] p-4"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#b8832f]" />
              <div>
                <p className="font-semibold text-[#153e35]">{title}</p>
                <p className="mt-1 text-sm leading-5 text-slate-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProblemSolution() {
  const problems = [
    [
      "Manual Processes",
      "Important details end up scattered across paper registers and disjointed messages.",
    ],
    [
      "Security Challenges",
      "Visitor checks need a clearer, faster, and more reliable digital verification process.",
    ],
    [
      "Maintenance Delays",
      "Requests can get delayed or missed when there is no centralized ownership.",
    ],
    [
      "Communication Gaps",
      "Emergency notices and society updates do not always reach every resident promptly.",
    ],
  ];

  return (
    <>
      <section className="bg-[#f4f5f0] py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="THE EVERYDAY CHALLENGE"
            title="Managing a Modern Society Shouldn't Be Complicated."
          />
          <div className="mt-8 grid max-w-5xl gap-4 sm:grid-cols-2">
            {problems.map(([title, desc]) => (
              <article key={title} className="min-h-[172px] rounded-2xl bg-white p-6 shadow-sm">
                <AlertTriangle className="h-5 w-5 text-[#b8832f]" />
                <h3 className="mt-5 font-display text-xl font-bold text-[#153e35]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-lg font-semibold text-[#153e35]">
            SmartSociety brings everything together in one unified platform.
          </p>
        </div>
      </section>

      <section className="border-t border-[#153e35]/10 bg-white py-10 sm:py-12 lg:py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <SectionTitle
            eyebrow="THE SMARTSOCIETY APPROACH"
            title="One Platform for a Better Community."
            copy="A clear, shared place for the daily moments that keep your housing society moving smoothly."
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              [Users, "Connected", "Residents, security, and management stay aligned."],
              [ClipboardList, "Organized", "Operations are structured in one transparent portal."],
              [ShieldCheck, "Secure", "Access logs and resident data follow strict controls."],
            ].map(([Icon, title, desc]) => (
              <article
                key={title}
                className="min-h-[178px] rounded-2xl border border-[#153e35]/10 p-5 shadow-sm"
              >
                <Icon className="h-5 w-5 text-[#5b9369]" />
                <h3 className="mt-5 font-bold text-[#153e35]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Features() {
  return (
    <section id="features" className="bg-[#fbfaf6] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle
          eyebrow="ONE CONNECTED PLATFORM"
          title="Everything Your Society Needs."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="min-h-[212px] rounded-2xl border border-[#153e35]/10 bg-white p-6 shadow-sm shadow-[#153e35]/[0.02] transition hover:-translate-y-1 hover:border-[#b8832f]/40 hover:shadow-xl hover:shadow-[#153e35]/5"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf3e9]">
                <Icon className="h-5 w-5 text-[#356152]" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-[#153e35]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowRoles() {
  const steps = [
    ["01", "Connect", "Residents and society staff access the platform according to their verified role."],
    ["02", "Manage", "Handle visitors, maintenance requests, complaints, and facility bookings."],
    ["03", "Stay Connected", "Receive urgent notices, community poll updates, and billing receipts."],
  ];

  return (
    <>
      <section id="how-it-works" className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle eyebrow="HOW IT WORKS" title="Simple for Everyone." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map(([num, title, desc]) => (
              <div key={num} className="border-l-2 border-[#b8832f] pl-6">
                <p className="font-mono text-sm text-[#b8832f]">{num}</p>
                <h3 className="mt-4 font-display text-2xl font-bold text-[#153e35]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#edf3e9] py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="BUILT FOR THE WHOLE COMMUNITY"
            title="One Platform. Different Roles."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((r, i) => (
              <article key={r.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-[#b8832f]">0{i + 1}</p>
                <h3 className="mt-8 font-display text-2xl font-bold text-[#153e35]">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Security() {
  const securityPoints = [
    "Digital Gate Passes",
    "QR Verification",
    "Visitor Logs",
    "Emergency Alerts",
  ];

  return (
    <section id="security" className="bg-[#153e35] py-10 text-white sm:py-12 lg:py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 lg:grid-cols-2 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem]">
          <img
            src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85"
            alt="Secure modern community entrance"
            className="h-72 w-full object-cover sm:h-80"
          />
          <div className="absolute inset-0 bg-[#153e35]/25" />
        </div>

        <div className="lg:px-8">
          <SectionTitle
            dark
            eyebrow="SECURITY AT EVERY STEP"
            title="A Safer Society Starts at the Gate."
          />
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
            {securityPoints.map((point) => (
              <p key={point} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-[#e5c581]" />
                {point}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Amenities({ onNavigate }) {
  const amenityCards = [
    {
      id: "clubhouse",
      title: "Clubhouse",
      desc: "A shared space for gatherings, coworking, and community moments.",
      img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "swimming-pool",
      title: "Swimming Pool",
      desc: "Easy facility access for relaxing days and fitness laps at home.",
      img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "sports-courts",
      title: "Sports Courts",
      desc: "Make bookings simple and fair for basketball, tennis, and badminton.",
      img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "party-hall",
      title: "Party Hall",
      desc: "Plan celebrations with a clear schedule, banquet hall, and lawn.",
      img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85",
    },
  ];

  return (
    <section id="amenities" className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle
          eyebrow="MORE TIME TO ENJOY HOME"
          title="Better Living, Right at Home."
          copy="Explore our society facilities below. Click on any amenity card to view full details, operating schedules, and reserve digital access passes."
        />

        <div className="mt-8 grid gap-7 sm:gap-8 lg:gap-10 sm:grid-cols-2">
          {amenityCards.map((item) => (
            <article
              key={item.id}
              onClick={() => onNavigate && onNavigate("amenity", item.id)}
              className="group relative h-72 cursor-pointer overflow-hidden rounded-2xl shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#153e35]/15"
              tabIndex={0}
              role="button"
              aria-label={`View details for ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onNavigate && onNavigate("amenity", item.id);
                }
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102f29]/90 via-[#102f29]/25 to-transparent transition duration-300 group-hover:from-[#102f29]/95" />

              <div className="absolute bottom-0 p-6 text-white w-full">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold flex items-center gap-2">
                    {item.title}
                    <ArrowRight className="h-5 w-5 text-[#e5c581] transition duration-300 group-hover:translate-x-1.5" />
                  </h3>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur opacity-0 transition duration-300 group-hover:opacity-100 hidden sm:inline-block">
                    View Details →
                  </span>
                </div>
                <p className="mt-2 text-sm leading-5 text-white/80">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ComplaintCommunityTrust() {
  const steps = [
    "Resident submits complaint",
    "Request assigned",
    "Maintenance works on it",
    "Issue resolved",
  ];

  const communityFeatures = [
    [Bell, "Announcements", "Official society notices and emergency circulars delivered instantly."],
    [CalendarDays, "Events", "Community events, festival schedules, and important dates."],
    [Users, "Community Polls", "Participate in society voting and transparent collective decisions."],
  ];

  return (
    <>
      <section className="bg-[#f4f5f0] py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="SERVICE MADE CLEAR"
            title="From Request to Resolution."
          />
          <div className="mt-8 grid items-center gap-4 sm:grid-cols-2 md:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step} className="rounded-2xl bg-white p-6 text-center shadow-sm">
                <span className="grid mx-auto h-9 w-9 place-items-center rounded-full bg-[#153e35] text-xs font-bold text-[#e5c581]">
                  {i + 1}
                </span>
                <p className="mt-4 text-sm font-semibold text-[#153e35]">{step}</p>
                <span
                  className={`mt-4 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    i === 0
                      ? "bg-amber-100 text-amber-700"
                      : i < 3
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {i === 0 ? "PENDING" : i < 3 ? "IN PROGRESS" : "RESOLVED"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="CLEAR COMMUNICATION"
            title="Stay Connected With Your Community."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {communityFeatures.map(([Icon, title, desc]) => (
              <article
                key={title}
                className="rounded-2xl border border-[#153e35]/10 p-7 shadow-sm"
              >
                <Icon className="h-5 w-5 text-[#b8832f]" />
                <h3 className="mt-5 font-display text-xl font-bold text-[#153e35]">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function FinalCTA() {
  return (
    <section id="contact" className="bg-[#edf3e9] py-12 text-center sm:py-14 lg:py-16">
      <div className="mx-auto max-w-2xl px-5">
        <p className="text-xs font-bold tracking-[.18em] text-[#153e35]">
          READY WHEN YOU ARE
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#153e35] sm:text-5xl">
          Ready to Make Your Society Smarter?
        </h2>
        <p className="mt-5 leading-7 text-[#153e35]/85">
          Bring residents, security, maintenance, and administration together through one connected platform.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/login"
            className="rounded-full bg-[#153e35] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#205448]"
          >
            Login to Portal
          </Link>
          <a
            href="#features"
            className="rounded-full border border-[#153e35]/30 px-6 py-3.5 text-sm font-semibold text-[#153e35] transition hover:bg-white/50"
          >
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
}
