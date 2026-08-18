import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Info,
  MapPin,
  PhoneCall,
  QrCode,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { amenitiesData, amenitiesList } from "../data/amenitiesData.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { FinalCTA } from "../components/LandingSections.jsx";

export default function AmenityDetail({ amenityId, onNavigate }) {
  const amenity = amenitiesData[amenityId] || amenitiesData["swimming-pool"];
  const [bookingDate, setBookingDate] = useState("");
  const [bookingSlot, setBookingSlot] = useState(amenity.schedule[0]?.time || "");
  const [residentUnit, setResidentUnit] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingPassId, setBookingPassId] = useState("");

  // Scroll to top when amenity changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setBookingConfirmed(false);
    if (amenity.schedule[0]) {
      setBookingSlot(amenity.schedule[0].time);
    }
  }, [amenityId]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingDate) {
      alert("Please select a valid date for your amenity reservation.");
      return;
    }
    const passCode = `PASS-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingPassId(passCode);
    setBookingConfirmed(true);
  };

  const otherAmenities = amenitiesList.filter((item) => item.id !== amenity.id);

  return (
    <div className="min-h-screen bg-[#fbfaf6] font-sans antialiased text-slate-800">
      <Navbar onNavigate={onNavigate} />

      <main className="pt-24 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="mx-auto max-w-7xl px-5 py-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#153e35]/10 pb-4">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
              <button
                onClick={() => onNavigate("home", "#home")}
                className="transition hover:text-[#153e35]"
              >
                Home
              </button>
              <span>/</span>
              <button
                onClick={() => onNavigate("home", "#amenities")}
                className="transition hover:text-[#153e35]"
              >
                Amenities
              </button>
              <span>/</span>
              <span className="font-semibold text-[#153e35]">
                {amenity.shortTitle}
              </span>
            </nav>

            <button
              onClick={() => onNavigate("home", "#amenities")}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#153e35] transition hover:text-[#b8832f] sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Back to All Amenities
            </button>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="mx-auto max-w-7xl px-5 pt-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b8832f]/30 bg-[#f4f5f0] px-3.5 py-1.5 text-xs font-bold tracking-[.18em] text-[#b8832f]">
                <Sparkles className="h-3.5 w-3.5" />
                {amenity.eyebrow}
              </div>

              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] text-[#153e35] sm:text-5xl lg:text-5xl">
                {amenity.title}
              </h1>

              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                {amenity.tagline}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edf3e9] px-3.5 py-1 text-xs font-semibold text-[#153e35]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#5b9369]" />
                  {amenity.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active & Maintained
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#book-amenity"
                  className="rounded-full bg-[#153e35] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#153e35]/15 transition hover:bg-[#205448]"
                >
                  Reserve Facility
                </a>
                <a
                  href="#guidelines"
                  className="rounded-full border border-[#153e35]/20 bg-white px-6 py-3.5 text-sm font-semibold text-[#153e35] transition hover:bg-[#f4f5f0]"
                >
                  View Schedule & Rules
                </a>
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div className="overflow-hidden rounded-[2rem] border border-[#153e35]/10 shadow-2xl shadow-[#153e35]/10">
                <img
                  src={amenity.heroImage}
                  alt={amenity.title}
                  className="h-[340px] w-full object-cover sm:h-[420px] transition duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-5 right-6 hidden rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#153e35] text-white">
                    <ShieldCheck className="h-5 w-5 text-[#e5c581]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Access Type</p>
                    <p className="text-sm font-bold text-[#153e35]">Verified Residents Only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Specs Grid */}
        <section className="mx-auto mt-14 max-w-7xl px-5 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {amenity.stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#153e35]/10 bg-white p-5 shadow-sm shadow-[#153e35]/5"
              >
                <p className="text-xs font-bold tracking-wider text-[#b8832f]">
                  {stat.label.toUpperCase()}
                </p>
                <p className="mt-2 font-display text-lg font-bold text-[#153e35]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Overview & Highlights */}
        <section className="mx-auto mt-16 max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-[.18em] text-[#b8832f]">
                ABOUT THE FACILITY
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-[#153e35] sm:text-4xl">
                Designed for Everyday Community Comfort
              </h2>

              <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                {amenity.overview.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="font-display text-2xl font-bold text-[#153e35]">
                  Key Features & Amenities
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {amenity.highlights.map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-[#153e35]/10 bg-white p-5 transition hover:border-[#b8832f]/40 hover:shadow-md"
                    >
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf3e9]">
                        <Icon className="h-5 w-5 text-[#356152]" />
                      </div>
                      <h4 className="mt-4 font-bold text-[#153e35]">{title}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Schedule, Guidelines, and Booking Form */}
            <div className="space-y-8 lg:col-span-5" id="guidelines">
              {/* Operating Schedule Card */}
              <div className="rounded-3xl border border-[#153e35]/10 bg-white p-6 shadow-sm shadow-[#153e35]/5 sm:p-7">
                <div className="flex items-center gap-3 border-b border-[#153e35]/10 pb-4">
                  <Clock className="h-5 w-5 text-[#b8832f]" />
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#153e35]">
                      Daily Schedule & Timings
                    </h3>
                    <p className="text-xs text-slate-500">Operating hours subject to maintenance</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3.5">
                  {amenity.schedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-1 rounded-xl bg-[#fbfaf6] p-3.5 border border-[#153e35]/5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#153e35]">
                          {item.time}
                        </span>
                        <span className="rounded-full bg-[#153e35]/10 px-2 py-0.5 text-[10px] font-bold text-[#153e35]">
                          {item.session}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{item.audience}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules & Guidelines */}
              <div className="rounded-3xl border border-[#153e35]/10 bg-[#edf3e9]/60 p-6 sm:p-7">
                <div className="flex items-center gap-3 border-b border-[#153e35]/10 pb-4">
                  <ShieldCheck className="h-5 w-5 text-[#153e35]" />
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#153e35]">
                      Resident Guidelines & Rules
                    </h3>
                    <p className="text-xs text-slate-600">Please review before using the facility</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-3">
                  {amenity.guidelines.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-5 text-slate-700">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8832f]" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Booking / Pass Generator Card */}
              <div
                className="rounded-3xl border border-[#153e35]/15 bg-white p-6 shadow-xl shadow-[#153e35]/5 sm:p-7"
                id="book-amenity"
              >
                <div className="flex items-center justify-between border-b border-[#153e35]/10 pb-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#b8832f]">
                      RESIDENT PORTAL
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#153e35]">
                      Book / Request Access
                    </h3>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf3e9] text-[#153e35]">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                </div>

                {bookingConfirmed ? (
                  <div className="mt-6 rounded-2xl bg-emerald-50 p-5 text-center border border-emerald-200">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h4 className="mt-3 font-display text-lg font-bold text-emerald-900">
                      Access Pass Generated!
                    </h4>
                    <p className="mt-1 text-xs text-emerald-700">
                      Your entry token has been recorded on the gate register.
                    </p>

                    <div className="mt-4 rounded-xl bg-white p-3 border border-emerald-200 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500">Pass Code</span>
                        <span className="font-mono text-sm font-bold text-[#153e35]">
                          {bookingPassId}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
                        <span className="text-slate-500">Amenity</span>
                        <span className="font-semibold text-slate-800">{amenity.shortTitle}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Date & Slot</span>
                        <span className="font-semibold text-slate-800">
                          {bookingDate} • {bookingSlot}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setBookingConfirmed(false)}
                      className="mt-4 text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
                    >
                      Make Another Booking
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="mt-5 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Select Date
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-[#fbfaf6] px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#153e35] focus:outline-none focus:ring-1 focus:ring-[#153e35]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Preferred Time Slot
                      </label>
                      <select
                        value={bookingSlot}
                        onChange={(e) => setBookingSlot(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-[#fbfaf6] px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#153e35] focus:outline-none focus:ring-1 focus:ring-[#153e35]"
                      >
                        {amenity.schedule.map((item, i) => (
                          <option key={i} value={item.time}>
                            {item.time} ({item.session})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700">
                          Flat / Unit #
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Tower B - 402"
                          value={residentUnit}
                          onChange={(e) => setResidentUnit(e.target.value)}
                          required
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-[#fbfaf6] px-3 py-2 text-sm text-slate-800 focus:border-[#153e35] focus:outline-none focus:ring-1 focus:ring-[#153e35]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700">
                          Persons / Guests
                        </label>
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-[#fbfaf6] px-3 py-2 text-sm text-slate-800 focus:border-[#153e35] focus:outline-none focus:ring-1 focus:ring-[#153e35]"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 Persons</option>
                          <option value="3">3 Persons</option>
                          <option value="4">4 Persons (Max)</option>
                          {amenity.id === "party-hall" && (
                            <>
                              <option value="50">50+ Guests</option>
                              <option value="150">150+ Guests</option>
                              <option value="300">Up to 300 Guests</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    <p className="text-[11px] leading-4 text-slate-500">
                      {amenity.bookingNote}
                    </p>

                    <button
                      type="submit"
                      className="w-full rounded-full bg-[#153e35] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#205448]"
                    >
                      Generate Digital Pass / Reserve
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Explore Other Amenities */}
        <section className="mx-auto mt-20 max-w-7xl px-5 lg:px-8">
          <div className="border-t border-[#153e35]/10 pt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[.18em] text-[#b8832f]">
                  MORE TO ENJOY
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold text-[#153e35]">
                  Explore Other Society Amenities
                </h3>
              </div>
              <button
                onClick={() => onNavigate("home", "#amenities")}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#153e35] hover:text-[#b8832f]"
              >
                View all in Amenities Section <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {otherAmenities.map((item) => (
                <article
                  key={item.id}
                  onClick={() => onNavigate("amenity", item.id)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-[#153e35]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#b8832f]/40 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.heroImage}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#153e35]/70 via-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#153e35] backdrop-blur">
                      {item.shortTitle}
                    </span>
                  </div>

                  <div className="p-5">
                    <h4 className="font-display text-lg font-bold text-[#153e35] group-hover:text-[#b8832f] transition">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs leading-5 text-slate-600 line-clamp-2">
                      {item.tagline}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-[#153e35]">
                      <span>View Details & Timings</span>
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section on detail pages */}
        <div className="mt-20">
          <FinalCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
}
