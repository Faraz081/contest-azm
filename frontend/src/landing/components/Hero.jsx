import React from "react";
import { Link } from "react-router";
import { CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#fbfaf6] py-8 sm:py-10 lg:py-14"
    >
      <div className="absolute right-[-12rem] top-[-12rem] -z-10 h-[32rem] w-[32rem] rounded-full bg-[#dce8d6] blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <div className="hero-copy">
          <p className="text-xs font-bold tracking-[.18em] text-[#b8832f]">
            SMART HOUSING SOCIETY MANAGEMENT
          </p>
          <h1 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.04] tracking-tight text-[#153e35] sm:text-5xl lg:text-6xl">
            Smarter Management.{" "}
            <span className="text-[#b8832f]">Safer Communities.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            A centralized platform to manage residents, visitors, maintenance,
            complaints, and community facilities with ease.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="rounded-full bg-[#153e35] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#153e35]/15 transition hover:bg-[#205448]"
            >
              Login to Portal
            </Link>
            <a
              href="#features"
              className="rounded-full border border-[#153e35]/15 bg-white px-6 py-3.5 text-sm font-semibold text-[#153e35] shadow-sm transition hover:bg-[#f4f5f0]"
            >
              Explore Features
            </a>
          </div>
        </div>

        <div className="hero-media relative mx-auto w-full max-w-[540px]">
          <img
            className="h-[360px] w-full rounded-[2rem] object-cover shadow-2xl shadow-[#153e35]/20 sm:h-[540px]"
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1100&q=85"
            alt="Modern gated community"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-t from-[#153e35]/70 via-transparent" />

          <div className="hero-badge absolute left-4 top-5 max-w-[calc(100%-2rem)] rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-[#153e35] shadow-lg sm:left-4 sm:top-8 sm:px-4 sm:py-3">
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-[#5b9369]" />
            Visitor Approved
          </div>

          <div className="hero-badge absolute bottom-20 right-4 max-w-[calc(100%-2rem)] rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-[#153e35] shadow-lg sm:bottom-24 sm:px-4 sm:py-3">
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-[#5b9369]" />
            Maintenance Paid
          </div>

          <div className="hero-badge absolute bottom-4 left-4 rounded-xl bg-[#153e35] px-3 py-2.5 text-xs font-semibold text-white shadow-lg sm:bottom-5 sm:left-5 sm:px-4 sm:py-3">
            QR Gate Pass <span className="ml-2 text-[#e5c581]">✓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
