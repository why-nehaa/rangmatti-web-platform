'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Mountain, FlaskConical, Users, ArrowRight, ShieldCheck } from 'lucide-react';

export default function OurStoryPage() {
  return (
    <div className="bg-ivory-warm min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sand/30 border border-sand text-xs font-semibold text-charcoal">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Idea Tribe 2026 Academic Research Prototype</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal leading-tight">
            Our Story: Two Forms of Wealth in West Singhbhum.
          </h1>

          <p className="text-sm sm:text-base text-secondary leading-relaxed">
            RangMitti 2.0 was conceived by a passionate student team from CSE 2025–2029 in West Singhbhum, Jharkhand. Surrounded by iron ore deposits and vibrant tribal craft hamlets, we asked a fundamental question: Why can't mineral innovation directly empower indigenous creative livelihoods?
          </p>
        </div>

        {/* Narrative Split Block 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative h-80 w-full rounded-3xl overflow-hidden bg-clay-muted border border-border shadow-md">
            <Image
              src="/images/brand/our-story-landscape.jpg"
              alt="Jharkhand Red Earth and Tribal Homeland"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-secondary leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              The Geographical Paradox
            </h2>
            <p>
              West Singhbhum and the greater Chota Nagpur plateau harbor India's densest iron ore deposits. However, industrial beneficiation produces fine ferric slimes that accumulate in settling basins.
            </p>
            <p>
              Simultaneously, the indigenous Santhal, Ho, and Munda communities possess an unbroken oral legacy of earth murals (Sohrai and Khovar), lost-wax bell metal casting (Dokra), and clay pottery. Traditionally, village women gathered natural clays from local streams to paint celebratory ritual art.
            </p>
            <p>
              Our concept unites these realities: transform suitable mineral by-products into standardized creative materials under strict laboratory safety protocols.
            </p>
          </div>
        </div>

        {/* The 3 Core Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-paper border border-border space-y-3">
            <FlaskConical className="w-8 h-8 text-forest" />
            <h3 className="font-serif text-lg font-bold text-charcoal">
              Rigorous Safety Screening
            </h3>
            <p className="text-xs text-secondary leading-relaxed">
              We never promote untested mineral waste as pigment. Every batch is characterized for bio-leachable heavy metals (EPA 1311 TCLP) to guarantee absolute non-toxicity for artistic use.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-paper border border-border space-y-3">
            <Users className="w-8 h-8 text-terracotta" />
            <h3 className="font-serif text-lg font-bold text-charcoal">
              Artisan Cultural Co-Design
            </h3>
            <p className="text-xs text-secondary leading-relaxed">
              We do not treat tribal artists as mere factory workers. Artisans retain intellectual co-authorship, named profile attribution, and direct fair-trade retail shares.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-paper border border-border space-y-3">
            <Mountain className="w-8 h-8 text-sand-dark" />
            <h3 className="font-serif text-lg font-bold text-charcoal">
              Verifiable Provenance Passport
            </h3>
            <p className="text-xs text-secondary leading-relaxed">
              Every creation carries a permanent physical QR seal resolving to its public digital ledger—detailing the mine node, chemical test results, and creator story.
            </p>
          </div>
        </div>

        {/* Student Innovator Mission Statement */}
        <div className="p-8 rounded-3xl bg-charcoal text-paper space-y-4">
          <div className="flex items-center space-x-2 text-sand text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Academic Integrity & Pilot Disclosure</span>
          </div>

          <h3 className="font-serif text-2xl font-bold">
            A Project for Idea Tribe 2026
          </h3>

          <p className="text-xs sm:text-sm text-ivory-warm/80 leading-relaxed max-w-3xl">
            This platform is an academic demonstration developed for the Idea Tribe 2026 innovation challenge. Material characterization benchmarks and supply arrangements are proposed and undergoing active pilot validation with regional research collaborators. We believe the future of sustainable circular materials must be artistic, culturally grounded, and scientifically transparent.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
            <Link
              href="/materials"
              className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper transition-colors"
            >
              Explore Creative Materials
            </Link>
            <Link
              href="/how-it-works"
              className="px-5 py-2.5 rounded-xl bg-charcoal-soft border border-white/20 hover:border-sand text-paper transition-colors"
            >
              Learn the 8-Stage Process
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
