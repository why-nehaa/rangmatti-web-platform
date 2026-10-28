'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sampleArtisans } from '@/data/artisans';
import { Sparkles, MapPin, ArrowRight, Award } from 'lucide-react';

export default function ArtisansIndexPage() {
  return (
    <div className="bg-ivory-warm min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sand/30 border border-sand text-xs font-semibold text-charcoal">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Master Creators of Jharkhand</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal leading-tight">
            Meet the Artisans Behind RangMitti
          </h1>

          <p className="text-sm sm:text-base text-secondary leading-relaxed">
            Discover the living traditions of Santhal, Munda, and Ho craftspeople. By combining ancestral wisdom with standardized, safe mineral pigments, our partner artisans create museum-grade artworks with permanent provenance passports.
          </p>
          <p className="text-[11px] text-secondary/70 italic">
            *Profiles are illustrative demo representations for the Idea Tribe 2026 presentation.
          </p>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sampleArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="p-8 rounded-3xl bg-paper border border-border shadow-sm flex flex-col justify-between hover:border-sand hover:shadow-xl transition-all space-y-6"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-5">
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-clay-muted border border-border shrink-0">
                    <Image
                      src={artisan.avatar}
                      alt={artisan.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-terracotta">
                      {artisan.tribe}
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-charcoal">
                      <Link href={`/artisans/${artisan.slug}`}>{artisan.name}</Link>
                    </h2>
                    <p className="text-xs text-secondary flex items-center mt-1">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-terracotta shrink-0" />
                      {artisan.region}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-sand/20 border border-sand/40">
                  <p className="font-serif italic text-xs text-charcoal leading-relaxed">
                    "{artisan.quote}"
                  </p>
                </div>

                <p className="text-xs text-secondary leading-relaxed">
                  {artisan.bio}
                </p>

                <div className="space-y-2 pt-2 border-t border-border text-xs">
                  <span className="font-semibold text-charcoal block">Traditional Motifs:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {artisan.specialtyMotifs.map((motif, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-ivory-warm text-charcoal text-[11px]">
                        {motif}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-secondary font-medium">
                  {artisan.yearsOfExperience} Years Experience • {artisan.productsCount} Works Listed
                </span>
                <Link
                  href={`/artisans/${artisan.slug}`}
                  className="inline-flex items-center text-xs font-semibold text-terracotta hover:underline"
                >
                  <span>Explore Artworks & Bio</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
