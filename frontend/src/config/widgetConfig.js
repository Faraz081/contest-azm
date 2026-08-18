import { Users, Receipt, MessageSquareWarning, UserCheck, Wallet, CalendarCheck, ClipboardList, ShieldAlert } from 'lucide-react';

export const widgetConfig = {
  admin: [
    { label: 'Residents', value: 1250, icon: Users, color: 'primary' },
    { label: 'Unpaid Bills', value: 145, icon: Receipt, color: 'destructive' },
    { label: 'Complaints', value: 37, icon: MessageSquareWarning, color: 'secondary' },
    { label: 'Visitors Today', value: 284, icon: UserCheck, color: 'primary' },
  ],

  resident: [
    { label: 'Maintenance Due', value: 'Rs. 5,000', icon: Wallet, color: 'destructive' },
    { label: 'Visitor Passes', value: 2, icon: UserCheck, color: 'primary' },
    { label: 'Upcoming Booking', value: 'Clubhouse - 6:00 PM', icon: CalendarCheck, color: 'secondary' },
    { label: 'Open Complaints', value: 2, icon: MessageSquareWarning, color: 'destructive' },
  ],

  guard: [
    { label: 'Visitors Today', value: 127, icon: UserCheck, color: 'primary' },
    { label: 'Pending Approvals', value: 4, icon: ClipboardList, color: 'destructive' },
    { label: 'Security Alerts', value: 1, icon: ShieldAlert, color: 'destructive' },
  ],
};