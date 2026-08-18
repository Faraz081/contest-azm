import React from "react";

export default function Logo({ light = false }) {
  return (
    <span className="inline-flex items-center">
      <img
        src="/smartsociety-logo.png"
        alt="SmartSociety"
        className="h-auto w-[135px] sm:w-[160px] object-contain"
      />
    </span>
  );
}
