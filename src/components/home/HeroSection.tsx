'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, QrCode } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ivory-warm pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-border">
      {/* Background Subtle Gradient & Grain */}
      <div className="absolute inset-0 bg-paper-grain opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-clay-muted/70 border border-sand/60 text-xs font-semibold text-charcoal shadow-sm">
              <span className="w-2 h-2 rounded-full bg-terracotta" />
              <span>Idea Tribe 2026 Finalist Prototype</span>
              <span className="text-secondary/50">•</span>
              <span className="text-secondary">CSE 2025–2029, West Singhbhum</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-[1.08] tracking-tight">
              From Earth <br />
              <span className="italic font-normal text-terracotta">to Art.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-secondary leading-relaxed max-w-xl">
              Discover standardized creative materials and meaningful tribal artworks shaped by science, indigenous craftsmanship, and the living geological stories of Jharkhand.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/art"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-terracotta text-paper text-sm font-semibold hover:bg-terracotta-deep shadow-md hover:shadow-lg transition-all"
              >
                Explore Art & Crafts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              
              <Link
                href="/materials"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-paper border border-border hover:border-terracotta text-charcoal hover:text-terracotta text-sm font-semibold shadow-sm transition-all"
              >
                Browse Materials
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex items-center text-xs font-semibold text-secondary hover:text-terracotta underline decoration-border underline-offset-4 transition-colors"
              >
                Discover Our 8-Stage Process
              </Link>
            </div>

            {/* Provenance Micro Banner */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-border/80 max-w-lg">
              <div>
                <p className="font-serif text-lg sm:text-xl font-bold text-charcoal">100%</p>
                <p className="text-[11px] text-secondary">Traceable Mineral Batches</p>
              </div>
              <div>
                <p className="font-serif text-lg sm:text-xl font-bold text-charcoal">TCLP</p>
                <p className="text-[11px] text-secondary">Safety Screened</p>
              </div>
              <div>
                <p className="font-serif text-lg sm:text-xl font-bold text-charcoal">Direct</p>
                <p className="text-[11px] text-secondary">Artisan Collaboration</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame Glow */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-sand/30 via-terracotta/20 to-transparent blur-xl" />

              <div className="relative rounded-2xl overflow-hidden border border-sand/50 shadow-2xl bg-paper">
                <div className="relative h-[380px] sm:h-[440px] w-full">
                  <Image
                    src="/images/hero-banner.jpg"
                    alt="RangMitti Mineral Pigment Powders and Tribal Art on Natural Canvas"
                    fill
                    priority
                    className="object-cover"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                </div>

                {/* Floating Passport Badge inside image */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-paper/95 backdrop-blur-md border border-border shadow-lg flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-sand/30 border border-sand flex items-center justify-center text-charcoal">
                      <QrCode className="w-5 h-5 text-terracotta" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-charcoal">RangMitti Passport™</p>
                      <p className="text-[10px] text-secondary">Batch RM-FE-08 • Verified Safe</p>
                    </div>
                  </div>
                  <Link
                    href="/passport/RM-001-ART-007"
                    className="text-[11px] font-semibold text-terracotta hover:underline flex items-center"
                  >
                    View Record →
                  </Link>
                </div>
              </div>

              {/* Little Floating Decorative Pill */}
              <div className="hidden sm:flex absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-forest text-paper text-xs font-medium shadow-md items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Heavy Metal Leaching Tested</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
