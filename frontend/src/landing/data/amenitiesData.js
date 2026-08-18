import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Droplets,
  Flame,
  Gamepad2,
  LifeBuoy,
  MapPin,
  Music,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Utensils,
  Volume2,
  Wifi,
  Wind,
  Zap,
} from "lucide-react";

export const amenitiesData = {
  "swimming-pool": {
    id: "swimming-pool",
    slug: "swimming-pool",
    title: "Swimming Pool & Aquatic Center",
    shortTitle: "Swimming Pool",
    eyebrow: "RECREATION & WELLNESS",
    tagline: "Olympic-length temperature-controlled pool for leisure, fitness, and family time.",
    heroImage: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1400&q=85",
    badge: "Temperature Controlled • Certified Lifeguard",
    stats: [
      { label: "Pool Dimensions", value: "25m x 12.5m (Olympic-style)" },
      { label: "Depth Range", value: "3.5 ft to 6.5 ft" },
      { label: "Water Temperature", value: "27°C / 81°F Controlled" },
      { label: "Supervision", value: "Certified Lifeguards on Duty" },
    ],
    overview: [
      "The SmartSociety Aquatic Center provides a sparkling, resort-grade swimming facility right in the heart of our community. Thoughtfully engineered with dual-zone heating and advanced sand-and-UV filtration, our pool delivers safe, crystal-clear water year-round.",
      "Whether you are completing morning fitness laps, enjoying quiet afternoon leisure, or watching your kids splash safely in the dedicated shallow wading zone, the pool deck offers a serene escape with shaded cabanas, poolside loungers, and private changing suites.",
    ],
    highlights: [
      {
        icon: Droplets,
        title: "Advanced UV & Sand Filtration",
        desc: "Automated chemical balancing and multi-stage filtration ensure pristine, low-chlorine water gentle on eyes and skin.",
      },
      {
        icon: LifeBuoy,
        title: "Dedicated Kids Splash Zone",
        desc: "Separate 1.5 ft shallow pool with soft rounded edges, anti-slip tiling, and dedicated water toys for children.",
      },
      {
        icon: ShieldCheck,
        title: "Full-Time Lifeguard Supervision",
        desc: "Certified CPR and water safety professionals stationed on deck during all operational hours with AED first-aid readiness.",
      },
      {
        icon: Wind,
        title: "Luxury Changing & Shower Suites",
        desc: "Private male, female, and family locker rooms equipped with rainfall showers, hair dryers, and RFID lockers.",
      },
      {
        icon: Sparkles,
        title: "Poolside Loungers & Shaded Cabanas",
        desc: "Comfortable ergonomic sunbeds and teak pergolas for relaxation, reading, and weekend unwinding.",
      },
      {
        icon: Trophy,
        title: "Resident Swim Coaching & Classes",
        desc: "Structured weekend training batches for beginner children, stroke improvement, and aqua-aerobics sessions.",
      },
    ],
    schedule: [
      { time: "06:00 AM – 10:00 AM", session: "Morning Lap Swim", audience: "All Registered Residents" },
      { time: "10:30 AM – 12:30 PM", session: "Women-Only Hour", audience: "Women Residents & Children under 6" },
      { time: "12:30 PM – 03:30 PM", session: "Maintenance & Water Balancing", audience: "Facility Closed" },
      { time: "04:00 PM – 07:30 PM", session: "Open Family Recreation", audience: "All Residents & Verified Guests" },
      { time: "08:00 PM – 09:30 PM", session: "Adult Evening Fitness Swim", audience: "Ages 16+ Only" },
    ],
    guidelines: [
      "Appropriate synthetic swimwear (nylon/spandex) and swim caps are strictly required in the main pool.",
      "A 60-second rinse under the pool deck showers is mandatory prior to entering the water.",
      "Children under the age of 12 must be accompanied and supervised by an adult resident at all times.",
      "Glass bottles, food items, chewing gum, and personal sound systems are not permitted on the deck.",
      "Residents can bring up to 3 guests per apartment with prior booking via the SmartSociety app.",
    ],
    bookingNote: "Open lap sessions require no advance reservation. Simply tap your resident RFID badge at the turnstile. Coaching sessions and guest passes can be booked on the app.",
  },

  "sports-courts": {
    id: "sports-courts",
    slug: "sports-courts",
    title: "Multi-Sport Arena & Floodlit Courts",
    shortTitle: "Sports Courts / Basketball",
    eyebrow: "ATHLETICS & FITNESS",
    tagline: "Professional-grade outdoor basketball, tennis, and indoor badminton courts built to international standards.",
    heroImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1400&q=85",
    badge: "Floodlit • Multi-Sport FIBA Standard",
    stats: [
      { label: "Available Courts", value: "2 Basketball • 2 Tennis • 4 Badminton" },
      { label: "Court Flooring", value: "8-Layer Acrylic Cushion & Hardwood" },
      { label: "Night Illumination", value: "1,200 Lux Anti-Glare LED Floodlights" },
      { label: "Access Hours", value: "05:30 AM – 10:30 PM Daily" },
    ],
    overview: [
      "Designed for casual weekend matches and competitive tournament play alike, the SmartSociety Sports Arena brings professional athletic facilities to your doorstep. The facility features full-size basketball courts, competition tennis courts, and indoor hardwood badminton courts.",
      "With high-illumination anti-glare floodlighting, automatic scoreboards, equipment lockers, and spectator viewing galleries, residents can organize pickup games, practice drills, or participate in inter-block community tournaments.",
    ],
    highlights: [
      {
        icon: Zap,
        title: "FIBA Standard Basketball Court",
        desc: "Regulation dimensions with tempered glass backboards, pro-breakaway rims, and shock-absorbing acrylic surface.",
      },
      {
        icon: Trophy,
        title: "ITF Specification Tennis Courts",
        desc: "Two full-size synthetic turf and acrylic courts with regulation netting, center straps, and practice rebound walls.",
      },
      {
        icon: Wind,
        title: "Indoor Hardwood Badminton Arena",
        desc: "Four BWF-certified wooden floor courts with air filtration, uniform lighting, and zero draft interference.",
      },
      {
        icon: Sparkles,
        title: "1,200 Lux Stadium Floodlights",
        desc: "Evenly distributed LED lighting towers allowing crystal-clear visibility for fast-paced evening play.",
      },
      {
        icon: ShieldCheck,
        title: "On-Site Sports Equipment Station",
        desc: "Complimentary borrowable basketballs, tennis rackets, shuttlecocks, and stringing services at the equipment desk.",
      },
      {
        icon: Users,
        title: "Tiered Spectator Gallery",
        desc: "Shaded stadium bench seating for 120+ spectators, perfect for community weekend leagues and friendly matches.",
      },
    ],
    schedule: [
      { time: "05:30 AM – 09:30 AM", session: "Morning Open Play & Training", audience: "All Residents (Walk-in or Booked)" },
      { time: "10:00 AM – 03:30 PM", session: "Coaching Clinics & Practice Drills", audience: "Coached Batches & Solo Practice" },
      { time: "04:00 PM – 07:00 PM", session: "Youth & Junior Play Hours", audience: "Residents under 18 & Families" },
      { time: "07:00 PM – 10:30 PM", session: "Floodlit Prime League & Pickup", audience: "Reserved 60-Minute Slots via App" },
    ],
    guidelines: [
      "Non-marking rubber-soled sports shoes are mandatory on all acrylic and wooden court surfaces.",
      "Court reservations are limited to 60 minutes per apartment during peak hours (06:00 PM – 10:00 PM).",
      "Please return all borrowed equipment (balls, nets, cones) to the locker desk immediately following your session.",
      "No cycling, skateboarding, or rollerblading allowed on the synthetic court surfaces.",
      "Cancellations must be made at least 2 hours in advance via the app to free slots for other residents.",
    ],
    bookingNote: "Reserve court slots up to 7 days ahead on the SmartSociety Resident Portal. Instant QR pass verification at the court gate.",
  },

  "clubhouse": {
    id: "clubhouse",
    slug: "clubhouse",
    title: "Community Clubhouse & Resident Lounge",
    shortTitle: "Clubhouse",
    eyebrow: "COMMUNITY & LEISURE",
    tagline: "The vibrant social heart of the society featuring lounges, coworking spaces, games, and entertainment.",
    heroImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    badge: "High-Speed Wi-Fi • Resident Lounge",
    stats: [
      { label: "Facility Area", value: "15,000 sq. ft. across 3 Levels" },
      { label: "Work & Connect", value: "1 Gbps High-Speed Fiber Mesh" },
      { label: "Community Spaces", value: "Lounge • Coworking • Mini-Theater" },
      { label: "Operational Hours", value: "06:00 AM – 11:00 PM Daily" },
    ],
    overview: [
      "The SmartSociety Clubhouse is the central hub where neighbors connect, remote professionals focus, and families unwind. Spread across three beautifully styled levels, this architectural centerpiece blends contemporary comfort with community utility.",
      "Featuring a quiet executive coworking lounge with private phone booths, an indoor gaming arcade with pool and table tennis, a curated resident library, and a 35-seat private screening theater, the Clubhouse enriches every dimension of society life.",
    ],
    highlights: [
      {
        icon: Wifi,
        title: "Executive Coworking & Meeting Suites",
        desc: "Ergonomic workstations, high-speed fiber internet, soundproof phone booths, and reservable conference rooms.",
      },
      {
        icon: Gamepad2,
        title: "Indoor Gaming & Billiards Lounge",
        desc: "Tournament-grade 9-foot slate pool tables, multiple table tennis stations, carrom boards, and chess corners.",
      },
      {
        icon: Volume2,
        title: "35-Seat Private Screening Theater",
        desc: "4K Laser projection with Dolby Atmos surround sound, reservable for community match screenings and movie nights.",
      },
      {
        icon: Sparkles,
        title: "Resident Library & Reading Room",
        desc: "Curated collection of 2,500+ books, periodicals, and cozy reading nooks with natural light and scenic garden views.",
      },
      {
        icon: Utensils,
        title: "Café Corner & Terrace Seating",
        desc: "Self-serve espresso bar, beverage coolers, and open-air landscaped terrace for relaxed socializing.",
      },
      {
        icon: ShieldCheck,
        title: "Secure App-Based RFID Access",
        desc: "Seamless entry using the resident app or smart fobs, keeping common spaces private and safe for members.",
      },
    ],
    schedule: [
      { time: "06:00 AM – 11:00 PM", session: "Main Clubhouse & Resident Lounge", audience: "Open to All Verified Residents" },
      { time: "24 Hours (7 Days)", session: "Remote Coworking Study Desks", audience: "Registered Remote Worker Badge" },
      { time: "10:00 AM – 10:00 PM", session: "Mini-Theater & Screenings", audience: "Bookable in 2-Hour Blocks" },
      { time: "08:00 AM – 09:30 PM", session: "Café & Beverage Bar", audience: "Residents & Guests" },
    ],
    guidelines: [
      "Please respect fellow residents by keeping noise levels low in designated quiet and study zones.",
      "Children under 8 years must be accompanied by a guardian in gaming and lounge areas.",
      "Conference rooms can be reserved for up to 3 hours per day through the SmartSociety app.",
      "Food and drinks are permitted in the café, lounge, and terrace only (not in library or game stations).",
      "Private use of the mini-theater must be booked 24 hours in advance.",
    ],
    bookingNote: "Open lounge and library areas require no booking. Meeting rooms, mini-theater, and billiards tables can be booked instantly in the app.",
  },

  "party-hall": {
    id: "party-hall",
    slug: "party-hall",
    title: "Grand Banquet & Celebration Hall",
    shortTitle: "Party Hall",
    eyebrow: "EVENTS & CELEBRATIONS",
    tagline: "Spacious, elegantly designed venue for birthday parties, family anniversaries, and community celebrations.",
    heroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85",
    badge: "300+ Guest Capacity • Full AV Setup",
    stats: [
      { label: "Guest Capacity", value: "Up to 300 Guests (Banquet Style)" },
      { label: "Hall Dimensions", value: "4,500 sq. ft. Main + 2,000 sq. ft. Lawn" },
      { label: "Audio/Visual", value: "Integrated 4K Projection & Wireless PA" },
      { label: "Catering Setup", value: "Commercial Prep Kitchen & Buffets" },
    ],
    overview: [
      "Celebrate life's memorable milestones without leaving the security and comfort of home. The Grand Party Hall at SmartSociety is a premier banquet venue crafted to host weddings, birthday celebrations, festivals, and cultural events.",
      "With acoustic wall paneling, customizable ambient mood lighting, a raised performance stage, a fully equipped commercial food prep kitchen, and an attached open-air garden lawn, your celebrations will feel grand, smooth, and unforgettable.",
    ],
    highlights: [
      {
        icon: Users,
        title: "Spacious Modular Banquet Floor",
        desc: "4,500 sq. ft. column-free hall comfortably accommodating 300 guests with versatile seating and dining setups.",
      },
      {
        icon: Music,
        title: "Pro Audio & Stage Illumination",
        desc: "Dual wireless microphones, multi-channel sound mixing console, motorized stage curtains, and spotlighting.",
      },
      {
        icon: Utensils,
        title: "Commercial Catering Kitchen & Pantry",
        desc: "Dedicated service entrance, deep freezers, hot-holding warmers, wash counters, and separate buffet lines.",
      },
      {
        icon: Flame,
        title: "Private Lawn & Al-Fresco Extension",
        desc: "Adjoining 2,000 sq. ft. landscaped party lawn for barbecue dinners, evening receptions, and cocktail setups.",
      },
      {
        icon: Sparkles,
        title: "Bridal / Host Dressing Suite",
        desc: "Air-conditioned private green room with illuminated vanity mirrors, private restroom, and secure wardrobe lockers.",
      },
      {
        icon: ShieldCheck,
        title: "Guest Gate Parking & Concierge",
        desc: "Designated visitor parking bays and temporary digital guest passes generated effortlessly via the resident portal.",
      },
    ],
    schedule: [
      { time: "09:00 AM – 03:00 PM", session: "Morning Slot (Breakfast / Lunch Events)", audience: "Reservations Open 60 Days in Advance" },
      { time: "05:00 PM – 11:30 PM", session: "Evening Slot (Dinner & Celebrations)", audience: "Music Curfew at 10:30 PM" },
      { time: "09:00 AM – 11:30 PM", session: "Full-Day Exclusive Hall Booking", audience: "Major Family Functions & Weddings" },
    ],
    guidelines: [
      "All external decorators, caterers, and musical artists must be registered at the security gate 24h before the event.",
      "Music amplification and DJ equipment must conclude by 10:30 PM sharp in compliance with residential guidelines.",
      "Open flames, fireworks, and hazardous decorations are strictly prohibited inside the indoor hall.",
      "Hall handover inspection is conducted with the facility manager before and after each booking.",
      "Refundable security deposit is credited back within 48 hours post event clearance.",
    ],
    bookingNote: "Check calendar availability and reserve your date directly through the SmartSociety app. Maintenance fee includes pre/post cleaning and backup power.",
  },
};

export const amenitiesList = Object.values(amenitiesData);
