'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Handshake, FlaskConical, Building, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PartnershipsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-ivory-warm min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold">
            <Handshake className="w-3.5 h-3.5" />
            <span>Institutional Collaboration</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Partner with RangMitti
          </h1>

          <p className="text-sm text-secondary leading-relaxed max-w-xl mx-auto">
            We actively collaborate with mining operators, research institutions (such as CSIR-NML), and cultural design academies to pilot responsible valorization and tribal heritage preservation.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-paper border border-sand shadow-lg space-y-6">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-forest mx-auto animate-bounce" />
              <h3 className="font-serif text-xl font-bold text-charcoal">
                Partnership Proposal Registered!
              </h3>
              <p className="text-xs text-secondary max-w-sm mx-auto">
                Thank you for reaching out to the student research team of CSE 2025–2029. We will review your institutional synergy and respond promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Entity / Institution Name *</label>
                  <input
                    type="text"
                    required
                    defaultValue="Mineral Characterization Lab (Pilot)"
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Partnership Track *</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta">
                    <option>Mineral Sourcing & Tailings Supply MoU</option>
                    <option>Laboratory Characterization & Safety Testing</option>
                    <option>Artisan Cooperative Livelihoods Co-design</option>
                    <option>Academic Research & Circular Materials Grant</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Contact Email *</label>
                  <input
                    type="email"
                    required
                    defaultValue="liaison@csir-partner.demo"
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    defaultValue="+91 651 223344"
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Proposed Scope of Collaboration</label>
                <textarea
                  rows={4}
                  defaultValue="Interested in extending pilot XRF and TCLP testing protocols for newly characterized iron beneficiation slimes from Saranda."
                  className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-forest hover:bg-forest-deep text-paper font-semibold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Submit Partnership Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
