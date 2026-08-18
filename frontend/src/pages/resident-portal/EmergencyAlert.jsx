import React, { useState } from 'react';
import api from '../../services/api';
import {
  Flame,
  HeartPulse,
  ShieldAlert,
  Volume2,
  PhoneCall,
  CheckCircle2,
  Radio,
  Building2,
  BellRing,
} from 'lucide-react';
import { showToast } from '../../utils/toast';

export default function EmergencyAlert() {
  const [alertSent, setAlertSent] = useState(false);
  const [alertType, setAlertType] = useState('Medical Emergency');
  const [activeCallModal, setActiveCallModal] = useState(null);

  const unit = 'Flat A-402, Palm Grove Residency, Karachi';

  const emergencyTypes = [
    {
      id: 'medical',
      label: 'Medical Emergency',
      icon: HeartPulse,
    },
    {
      id: 'fire',
      label: 'Fire / Smoke Hazard',
      icon: Flame,
    },
    {
      id: 'security',
      label: 'Security Threat / Intrusion',
      icon: ShieldAlert,
    },
    {
      id: 'lift',
      label: 'Elevator Stuck / Breakdown',
      icon: Building2,
    },
  ];

  const emergencyContacts = [
    {
      name: 'Gate 1 Security Post',
      number: 'Ext: 101 / +92 300 1234567',
      icon: ShieldAlert,
      role: 'Gate Security',
    },
    {
      name: 'Society Management Office',
      number: 'Ext: 100 / +92 321 7654321',
      icon: Building2,
      role: 'Facility Desk',
    },
    {
      name: 'Rescue & Ambulance Service (Govt)',
      number: '1122',
      icon: HeartPulse,
      role: 'Emergency Medical',
    },
    {
      name: 'Police Emergency Helpline',
      number: '15',
      icon: Radio,
      role: 'Police Patrol',
    },
    {
      name: 'Fire Brigade Dept',
      number: '16',
      icon: Flame,
      role: 'Fire Emergency',
    },
  ];

  const typeMap = {
    'Medical Emergency': 'Medical',
    'Fire / Smoke Hazard': 'Fire',
    'Security Threat / Intrusion': 'Security',
    'Elevator Stuck / Breakdown': 'Maintenance',
  };

  // RESIDENT → GUARD EMERGENCY ALERT
  const triggerSiren = async () => {
    const confirmed = window.confirm(
      `🚨 EMERGENCY CONFIRMATION:\n\nAre you sure you want to broadcast a ${alertType.toUpperCase()} panic siren to Society Gate Security?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await api.post('/resident/emergency', {
        title: alertType,
        description: `Panic alert triggered from ${unit}`,
        type: typeMap[alertType] || 'Other',
        location: unit,
      });

      if (response.data.success) {
        setAlertSent(true);

        showToast(
          `🚨 HIGH PRIORITY: ${alertType} sent to Security!`,
          'error',
          6000
        );
      }
    } catch (err) {
      console.error('Emergency alert error:', err);

      showToast(
        err.response?.data?.message ||
          'Could not send emergency alert to security.',
        'error',
        6000
      );
    }
  };

  const cancelSiren = () => {
    setAlertSent(false);

    showToast(
      'Emergency alert canceled and cleared.',
      'info'
    );
  };

  return (
    <div>
      <h2 className="font-heading text-2xl text-foreground mb-6">
        Emergency SOS Alert
      </h2>

      {/* ACTIVE SIREN */}
      {alertSent && (
        <div className="p-5 rounded-xl border border-destructive bg-destructive/10 text-destructive mb-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive text-destructive-foreground flex items-center justify-center shrink-0">
              <BellRing size={20} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Live Siren Active
                </span>

                <span className="w-2 h-2 rounded-full bg-destructive animate-ping"></span>
              </div>

              <h3 className="font-heading text-lg font-semibold">
                {alertType.toUpperCase()} BROADCASTED
              </h3>

              <p className="text-xs text-muted-foreground mt-0.5">
                Location:{' '}
                <strong className="text-foreground">
                  {unit}
                </strong>{' '}
                • Guard rapid response dispatched.
              </p>
            </div>
          </div>

          <button
            onClick={cancelSiren}
            className="border border-destructive text-destructive hover:bg-destructive/15 px-4 py-2 rounded-lg font-medium text-xs transition cursor-pointer"
          >
            Cancel / Clear Alarm
          </button>
        </div>
      )}

      {/* MAIN EMERGENCY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

        {/* PANIC BUTTON */}
        <div className="lg:col-span-6 bg-card border border-border rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xs">

          {/* CATEGORY SELECTOR */}
          <div className="w-full mb-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              1. Select Emergency Type:
            </p>

            <div className="grid grid-cols-2 gap-2">
              {emergencyTypes.map((t) => {
                const isSelected = alertType === t.label;
                const Icon = t.icon;

                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setAlertType(t.label)}
                    className={`p-3 rounded-lg border flex items-center gap-2.5 transition text-xs font-medium cursor-pointer ${
                      isSelected
                        ? 'border-destructive bg-destructive/10 text-destructive font-semibold shadow-xs'
                        : 'border-border text-muted-foreground hover:border-border hover:text-foreground'
                    }`}
                  >
                    <Icon size={16} />

                    <span className="truncate">
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PANIC BUTTON */}
          <div className="my-2 flex flex-col items-center">
            <button
              onClick={triggerSiren}
              className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center text-destructive-foreground shadow-lg transition duration-200 active:scale-95 cursor-pointer ${
                alertSent
                  ? 'bg-destructive ring-8 ring-destructive/30 animate-pulse'
                  : 'bg-destructive hover:opacity-90'
              }`}
            >
              <Volume2 size={36} className="mb-1" />

              <span className="font-heading text-xl sm:text-2xl font-bold tracking-wider">
                PANIC
              </span>

              <span className="text-[11px] font-mono tracking-widest uppercase">
                SOS SIREN
              </span>
            </button>

            <p className="text-xs text-muted-foreground mt-4 max-w-xs text-center">
              Pressing the SOS button broadcasts your unit location instantly
              to Gate 1 security guards.
            </p>
          </div>
        </div>

        {/* EMERGENCY DIRECTORY */}
        <div className="lg:col-span-6 bg-card border border-border rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
          <div>
            <div className="p-4 sm:p-5 border-b border-border">
              <h3 className="font-heading text-lg text-foreground">
                Emergency Hotline Directory
              </h3>

              <p className="text-xs text-muted-foreground">
                Direct contact numbers for Pakistan emergency services
              </p>
            </div>

            <div className="divide-y divide-border">
              {emergencyContacts.map((contact, idx) => {
                const Icon = contact.icon;

                return (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-muted/30 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Icon size={18} />
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-foreground">
                          {contact.name}
                        </h4>

                        <p className="text-xs text-muted-foreground font-mono">
                          {contact.number}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveCallModal(contact);

                        showToast(
                          `Connecting to ${contact.name}...`,
                          'info'
                        );
                      }}
                      className="border border-input px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-accent flex items-center gap-1 transition cursor-pointer"
                    >
                      <PhoneCall size={14} className="text-primary" />
                      <span>Call</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-muted/40 border-t border-border text-xs text-muted-foreground flex items-center justify-between font-mono">
            <span>
              Unit:{' '}
              <strong className="text-foreground">
                Flat A-402
              </strong>
            </span>

            <span className="text-secondary font-medium flex items-center gap-1">
              <CheckCircle2 size={14} />
              System Online
            </span>
          </div>
        </div>
      </div>

      {/* CALL MODAL */}
      {activeCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-card border border-border rounded-xl max-w-sm w-full p-6 shadow-xl text-center text-foreground">

            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 animate-pulse">
              <PhoneCall size={24} />
            </div>

            <h3 className="font-heading text-lg text-foreground">
              Calling Hotline
            </h3>

            <h2 className="font-heading text-xl text-primary mt-1">
              {activeCallModal.name}
            </h2>

            <p className="text-xs font-mono text-muted-foreground mt-1">
              {activeCallModal.number}
            </p>

            <div className="mt-6">
              <button
                onClick={() => {
                  showToast('Call ended', 'info');
                  setActiveCallModal(null);
                }}
                className="w-full py-2 bg-destructive text-destructive-foreground text-xs font-medium rounded-lg transition cursor-pointer"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}