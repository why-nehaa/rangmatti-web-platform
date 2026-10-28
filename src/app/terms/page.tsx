'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="bg-ivory-warm min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-paper border border-border shadow-sm space-y-6 text-xs text-secondary leading-relaxed">
        <Link href="/" className="inline-flex items-center text-terracotta font-semibold hover:underline">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to RangMitti Home
        </Link>

        <h1 className="font-serif text-3xl font-bold text-charcoal">Terms of Service</h1>
        <p className="text-[11px] text-secondary">Effective Date: Idea Tribe 2026 Academic Pilot Edition</p>

        <div className="space-y-4 pt-2">
          <h2 className="font-serif text-base font-bold text-charcoal">1. Concept & Feasibility Disclosure</h2>
          <p>
            RangMitti is a concept developed by student innovators from CSE 2025–2029, West Singhbhum, Jharkhand for Idea Tribe 2026. Sourcing channels, characterization protocols, and community livelihood models are proposed and undergoing feasibility pilots.
          </p>

          <h2 className="font-serif text-base font-bold text-charcoal">2. Permitted Use of Creative Materials</h2>
          <p>
            Standardized creative materials sold on this platform are strictly certified for decorative art, mural painting, calligraphy, ceramic slipware, and textile crafts. They are explicitly NOT permitted for cosmetic, food, or pharmaceutical use.
          </p>

          <h2 className="font-serif text-base font-bold text-charcoal">3. Cultural Integrity Covenant</h2>
          <p>
            Tribal artworks created by our master artisans are protected under our Co-Design Charter. Customers acquire ownership of the physical object with digital passport provenance; ritual and sacred motifs remain the intangible cultural heritage of the community.
          </p>
        </div>
      </div>
    </div>
  );
}
