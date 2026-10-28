'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export default function TwoWealthSection() {
  return (
    <section className="py-20 bg-paper border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-terracotta">
            The RangMitti Premise
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Two forms of wealth. <br />
            <span className="italic text-terracotta">One connected journey.</span>
          </h2>
          <p className="text-sm sm:text-base text-secondary leading-relaxed">
            Jharkhand is blessed with immense geological richness and deep tribal creative traditions. RangMitti unites these complementary assets into a standardized, transparent material-to-market ecosystem.
          </p>
        </div>

        {/* Two Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Feature 1: RangMitti Materials */}
          <div className="group rounded-2xl bg-ivory-warm p-8 border border-border hover:border-sand hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest/10 border border-forest/20 flex items-center justify-center text-forest">
                <Layers className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forest">
                  For Artists, Studios & Conservators
                </span>
                <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-forest transition-colors">
                  RangMitti Materials
                </h3>
              </div>

              <p className="text-sm text-secondary leading-relaxed">
                Creative possibilities from suitable, scientifically assessed mineral-derived materials. By purifying mineral beneficiation by-products—including iron ore slimes, kaolin clay washes, and copper flotation tailings—we produce lightfast, non-toxic creative pigments.
              </p>

              <div className="space-y-2 pt-2 text-xs text-charcoal/80">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-forest" />
                  <span>EPA 1311 TCLP Heavy Metal Leaching Screened</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-forest" />
                  <span>Standardized particle sizes & binder-compatible slurry formats</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-forest" />
                  <span>Transparent laboratory documentation for every batch</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/materials"
                className="inline-flex items-center text-sm font-semibold text-forest hover:text-forest-deep transition-colors group/link"
              >
                <span>Browse Validated Creative Materials</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Feature 2: RangMitti Originals */}
          <div className="group rounded-2xl bg-ivory-warm p-8 border border-border hover:border-sand hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta">
                <Sparkles className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                  For Art Collectors & Cultural Patrons
                </span>
                <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-terracotta transition-colors">
                  RangMitti Originals
                </h3>
              </div>

              <p className="text-sm text-secondary leading-relaxed">
                Artisan-made works that bring craftsmanship, creativity, and living heritage to the forefront. Master creators from Santhal, Ho, and Munda traditions craft Sohrai murals, Dokra sculptures, and fine pottery utilizing verified local mineral pigments.
              </p>

              <div className="space-y-2 pt-2 text-xs text-charcoal/80">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-terracotta" />
                  <span>Direct creator attribution & dignified economic share</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-terracotta" />
                  <span>Tamper-evident RangMitti Digital Passport QR seal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-terracotta" />
                  <span>Living cultural storytelling rooted in ritual seasonality</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/art"
                className="inline-flex items-center text-sm font-semibold text-terracotta hover:text-terracotta-deep transition-colors group/link"
              >
                <span>Explore Artisan Art & Cultural Objects</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
