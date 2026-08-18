import { BellRing, CalendarDays, CreditCard, Headphones, QrCode, Siren } from "lucide-react";
export const features = [
  { icon: QrCode, title: "Visitor & Gate Management", desc: "Digital visitor passes, verification and entry records." },
  { icon: CreditCard, title: "Maintenance & Billing", desc: "Bills, charges, payment status and receipts." },
  { icon: Headphones, title: "Complaint & Helpdesk", desc: "Submit complaints and track their status." },
  { icon: CalendarDays, title: "Facility & Amenity Booking", desc: "Book the clubhouse, pool, courts and party hall." },
  { icon: BellRing, title: "Notices & Community Polls", desc: "Announcements, events, guidelines and polls." },
  { icon: Siren, title: "Emergency Alerts", desc: "Important contacts, notices and emergency alerts." },
];
export const roles = [
  { title: "Residents", text: "Bills, visitors, complaints and facility bookings." }, { title: "Security", text: "Visitor verification and gate logs." }, { title: "Administration", text: "Residents, billing and society operations." }, { title: "Maintenance", text: "Assigned service requests and work tracking." },
];
export const amenities = [
  ["Clubhouse", "A shared space for gatherings and community moments.", "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85"], ["Swimming Pool", "Easy facility access for relaxing days at home.", "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=85"], ["Sports Courts", "Make bookings simple and fair for every resident.", "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=85"], ["Party Hall", "Plan celebrations with a clear, shared schedule.", "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85"],
];
