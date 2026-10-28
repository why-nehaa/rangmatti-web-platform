'use client';

import React from 'react';
import Link from 'next/link';
import { sampleArtisans } from '@/data/artisans';
import { ArrowLeft, Edit, ShieldCheck } from 'lucide-react';

export default function SellerProfilePage() {
  const artisan = sampleArtisans[0]; // Shanti Soren

  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Artisan Profile & Bio
            </h1>
            <p className="text-xs text-secondary mt-1">
              Public representation as visible on RangMitti Passports and Marketplace
            </p>
          </div>
          <Link
            href="/seller/dashboard"
            className="text-xs font-semibold text-secondary hover:text-terracotta flex items-center"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Dashboard
          </Link>
        </div>

        <div className="p-8 rounded-3xl bg-paper border border-border shadow-sm space-y-6">
          <div className="flex items-center space-x-4 pb-6 border-b border-border">
            <div className="w-16 h-16 rounded-2xl bg-sand/30 border border-sand flex items-center justify-center font-serif font-bold text-2xl text-charcoal">
              SS
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-charcoal">{artisan.name}</h2>
              <p className="text-xs text-secondary">{artisan.craft} • {artisan.region}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded bg-forest/15 text-forest text-[10px] font-bold">
                Identity Verified • Community Consent Signed
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span className="font-bold text-charcoal block mb-1">Biography & Heritage Context:</span>
              <p className="text-secondary leading-relaxed bg-ivory-warm p-4 rounded-xl border border-border">
                {artisan.bio}
              </p>
            </div>

            <div>
              <span className="font-bold text-charcoal block mb-1">Creator Quote:</span>
              <p className="font-serif italic text-charcoal text-sm bg-sand/20 p-4 rounded-xl border border-sand/40">
                "{artisan.quote}"
              </p>
            </div>

            <div>
              <span className="font-bold text-charcoal block mb-1">Traditional Motifs Practiced:</span>
              <div className="flex flex-wrap gap-2">
                {artisan.specialtyMotifs.map((motif, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-ivory-warm border border-border text-charcoal">
                    {motif}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
