'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sampleArtisans } from '@/data/artisans';
import { ArrowRight, Sparkles, MapPin, Award } from 'lucide-react';

export default function FeaturedArtisansSection() {
  return (
    <section className="py-20 bg-ivory-warm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sand/30 border border-sand/50 text-xs font-semibold text-charcoal">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Master Creators of Jharkhand</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            The Hands Behind the Earth
          </h2>
          <p className="text-sm sm:text-base text-secondary leading-relaxed">
            RangMitti partners directly with tribal artisans across Santhal, Munda, and Ho traditions, ensuring fair recognition, stable livelihood opportunities, and respectful cultural stewardship.
          </p>
          <p className="text-[11px] text-secondary/70 italic">
            *Artisan profiles are illustrative demo representations for the Idea Tribe 2026 presentation.
          </p>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="group rounded-2xl bg-paper border border-border overflow-hidden hover:border-sand hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-48 w-full bg-clay-muted overflow-hidden">
                  <Image
                    src={artisan.heroImage}
                    alt={artisan.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

                  {/* Craft Badge */}
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-sand text-charcoal text-[10px] font-bold shadow-md">
                    {artisan.craft}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors">
                      <Link href={`/artisans/${artisan.slug}`}>{artisan.name}</Link>
                    </h3>
                    <div className="flex items-center text-xs text-secondary mt-1">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-terracotta shrink-0" />
                      <span className="truncate">{artisan.region}</span>
                    </div>
                  </div>

                  <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                    "{artisan.quote}"
                  </p>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-charcoal/80">
                    <span>{artisan.yearsOfExperience} Years Experience</span>
                    <span className="font-semibold text-terracotta">{artisan.productsCount} Works Listed</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <Link
                  href={`/artisans/${artisan.slug}`}
                  className="w-full inline-flex items-center justify-center py-2 px-3 rounded-lg bg-ivory-warm hover:bg-clay-muted text-charcoal text-xs font-semibold transition-colors"
                >
                  <span>View Artisan Story</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-paper border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-base font-bold text-charcoal">
              Are you an artisan or tribal producer group in Jharkhand?
            </h4>
            <p className="text-xs text-secondary">
              Learn about our pilot onboarding, material testing kits, and fair-trade listing support.
            </p>
          </div>
          <Link
            href="/sell"
            className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold whitespace-nowrap shadow-sm transition-all"
          >
            Apply to Join Collective
          </Link>
        </div>
      </div>
    </section>
  );
}
