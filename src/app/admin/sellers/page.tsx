'use client';

import React from 'react';
import Link from 'next/link';
import { sampleArtisans } from '@/data/artisans';
import { ArrowLeft, Users, ShieldCheck, Check } from 'lucide-react';

export default function AdminSellersPage() {
  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Seller & Artisan Application Audits
            </h1>
            <p className="text-xs text-secondary mt-1">
              Verify traditional lineage, co-design agreements, and regional craft registrations
            </p>
          </div>
          <Link
            href="/admin"
            className="text-xs font-semibold text-secondary hover:text-terracotta flex items-center"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Admin Overview
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-paper border border-border shadow-sm space-y-4">
          <div className="divide-y divide-border text-xs">
            {sampleArtisans.map((art) => (
              <div key={art.id} className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-charcoal text-sm">{art.name}</span>
                    <span className="px-2 py-0.5 rounded bg-forest/15 text-forest font-bold text-[10px]">
                      Verified Artisan
                    </span>
                  </div>
                  <p className="text-secondary">{art.craft} • {art.region} ({art.tribe})</p>
                  <p className="text-[11px] text-secondary">Experience: {art.yearsOfExperience} years • Active Catalogued Works: {art.productsCount}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <Link
                    href={`/artisans/${art.slug}`}
                    className="px-3.5 py-1.5 rounded-lg bg-ivory-warm border border-border text-xs font-semibold hover:border-terracotta"
                  >
                    View Public Bio
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
