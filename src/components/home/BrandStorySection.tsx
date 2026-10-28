'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, HeartHandshake, Mountain, ShieldAlert } from 'lucide-react';

export default function BrandStorySection() {
  return (
    <section className="py-20 bg-ivory-warm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-sand shadow-2xl bg-paper">
              <div className="relative h-[440px] w-full">
                <Image
                  src="/images/brand/artisan-hands.jpg"
                  alt="Artisan hands painting with natural mineral pigments"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              </div>

              {/* Floating Quote Card */}
              <div className="absolute bottom-5 inset-x-5 p-4 rounded-xl bg-paper/95 backdrop-blur-md border border-border shadow-md">
                <p className="font-serif italic text-xs text-charcoal leading-relaxed">
                  "For generations, we gathered natural red clay and charcoal to celebrate the harvest on our walls. RangMitti brings scientific testing so our art can travel safely across the world."
                </p>
                <p className="text-[10px] text-terracotta font-semibold mt-2">
                  — Shanti Soren, Sohrai Master Artist
                </p>
              </div>
            </div>
          </div>

          {/* Right Text Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
                Our Genesis & Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
                Where mineral innovation meets craftsmanship, culture, and opportunity.
              </h2>
            </div>

            <div className="space-y-4 text-sm text-secondary leading-relaxed">
              <p>
                In the mining landscapes of West Singhbhum and across Jharkhand, millions of tonnes of mineral by-products and beneficiation slimes accumulate annually. Simultaneously, rural tribal communities preserve some of the world's oldest ritual painting, metalcasting, and pottery traditions.
              </p>
              <p>
                Traditional tribal artists already understand the spirit of earth materials; however, raw uncharacterized clays and slimes can contain unpredictable trace elements or lack physical stability. Synthetic imported pigments, on the other hand, divorce indigenous artists from their ancestral bond with local soil.
              </p>
              <p>
                <strong className="text-charcoal font-semibold">RangMitti bridges this divide.</strong> We develop systematic characterization, safety screening, and standardized beneficiation protocols to transform suitable mineral streams into archival, non-toxic creative pigments. Master artisans then collaborate to craft works of timeless cultural resonance, verified at every milestone by a transparent digital passport.
              </p>
            </div>

            {/* Three Pillar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="space-y-1">
                <Mountain className="w-5 h-5 text-terracotta mb-2" />
                <h4 className="font-serif text-sm font-bold text-charcoal">
                  Mineral Valorization
                </h4>
                <p className="text-[11px] text-secondary">
                  Responsible repurposing of industrial mineral streams into high-value creative media.
                </p>
              </div>

              <div className="space-y-1">
                <HeartHandshake className="w-5 h-5 text-forest mb-2" />
                <h4 className="font-serif text-sm font-bold text-charcoal">
                  Cultural Dignity
                </h4>
                <p className="text-[11px] text-secondary">
                  Fair economic remuneration, co-design ownership, and tribal community attribution.
                </p>
              </div>

              <div className="space-y-1">
                <Sparkles className="w-5 h-5 text-sand-dark mb-2" />
                <h4 className="font-serif text-sm font-bold text-charcoal">
                  Uncompromised Science
                </h4>
                <p className="text-[11px] text-secondary">
                  Rigorous toxicity leaching screens before any material touches an artisan's brush.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/our-story"
                className="inline-flex items-center text-sm font-semibold text-terracotta hover:text-terracotta-deep transition-colors"
              >
                <span>Read the Complete Founding Story & Academic Mission</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
