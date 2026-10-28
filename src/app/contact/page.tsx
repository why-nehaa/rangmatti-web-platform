'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-ivory-warm min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
            Contact RangMitti
          </h1>
          <p className="text-sm text-secondary max-w-lg mx-auto">
            Have questions regarding our mineral pigments, tribal artworks, or the Idea Tribe 2026 student innovation initiative? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Info Card */}
          <div className="md:col-span-5 p-8 rounded-3xl bg-paper border border-border space-y-6 text-xs text-secondary">
            <h3 className="font-serif text-xl font-bold text-charcoal">
              Regional Operations Hub
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal block">Academic Innovation Base:</strong>
                  Student Team CSE 2025–2029<br />
                  West Singhbhum & Ranchi Corridor, Jharkhand, India
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal block">Email Desk:</strong>
                  contact@rangmitti.in • ideatribe2026@rangmitti.in
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sand-dark shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal block">Helpline / WhatsApp:</strong>
                  +91 (0651) 299-4411 (Pilot Desk)
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-[11px] leading-relaxed">
                Visiting artisan studios in Saranda requires prior registration to ensure respectful cultural privacy and eco-zone compliance.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 p-8 rounded-3xl bg-paper border border-sand shadow-sm space-y-4 text-xs">
            {sent ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-forest mx-auto" />
                <h3 className="font-serif text-lg font-bold text-charcoal">Message Delivered!</h3>
                <p className="text-secondary">We will respond to your inquiry within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Message Subject</label>
                  <input
                    type="text"
                    placeholder="Inquiry regarding art or mineral pigment specs"
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist you?"
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
