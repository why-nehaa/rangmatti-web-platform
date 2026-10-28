'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ShieldCheck, QrCode } from 'lucide-react';

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are RangMitti mineral pigments safe for artists and children?',
      a: 'All pigments carrying the "Validated for Specified Use" badge undergo EPA 1311 TCLP leaching assays for toxic heavy metals (Lead, Cadmium, Arsenic) and conform to non-ingestive fine art safety limits. However, like any fine powdered medium, bulk dry powders should be mixed in well-ventilated areas to avoid airborne particulate inhalation. They are not approved for cosmetic, topical, or edible use.',
    },
    {
      q: 'Is the pigment chemistry itself a new invention?',
      a: 'No. Using iron oxides and clays for artistic expression is as old as human civilization itself. RangMitti\'s innovation lies in the integrated, traceable material-to-market ecosystem: characterizing previously unmanaged industrial mineral by-product streams, applying rigorous safety screening, standardizing them into archival artist media, directly empowering tribal artisans, and securing physical-to-digital provenance via the RangMitti Passport.',
    },
    {
      q: 'How does the RangMitti Digital Passport work?',
      a: 'Each product is affixed with a tamper-evident QR seal linked to a unique alphanumeric token (e.g. RM-001-ART-007). Scanning the QR code resolves to a public ledger page detailing the geological mining origin, laboratory leaching test reports, preparation dates, master artisan biography, and cultural significance.',
    },
    {
      q: 'How are tribal artisans compensated?',
      a: 'Under our fair-trade pilot covenant, artisans receive up to 80% of net retail sales value. RangMitti eliminates exploitative middleman chains, providing upfront materials at subsidized cooperative rates and ensuring permanent creator attribution.',
    },
    {
      q: 'What is Idea Tribe 2026?',
      a: 'Idea Tribe 2026 is an innovation challenge where this platform is presented by a student founding team from CSE 2025–2029, West Singhbhum, Jharkhand. Sourcing channels, lab characterizations, and socio-economic outcomes represent proposed pilot models being tested in real-world feasibility studies.',
    },
    {
      q: 'How does checkout and shipping work in this demo?',
      a: 'The platform includes a fully functional simulated demo checkout. You can place test orders, enter delivery information, test promo codes like "IDEATRIBE2026", and experience real-time order confirmation without any actual charges.',
    },
  ];

  return (
    <div className="bg-ivory-warm min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sand/30 text-charcoal text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-terracotta" />
            <span>Transparency & Knowledge Base</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
            Frequently Asked Questions
          </h1>

          <p className="text-sm text-secondary max-w-lg mx-auto">
            Everything you need to know about our mineral characterization protocols, artisan partnerships, and digital passports.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-2xl bg-paper border border-border overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-serif text-base font-bold text-charcoal">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-secondary shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-terracotta' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-secondary leading-relaxed border-t border-border/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-6 rounded-2xl bg-paper border border-sand text-center space-y-3">
          <p className="text-xs text-secondary">
            Have a technical laboratory inquiry or specific artisan commission request?
          </p>
          <Link
            href="/contact"
            className="inline-flex px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold transition-colors"
          >
            Contact the Research Desk
          </Link>
        </div>
      </div>
    </div>
  );
}
