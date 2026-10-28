'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Store, ShieldCheck, ArrowRight, HeartHandshake, Layers, Users } from 'lucide-react';

export default function SellLandingPage() {
  return (
    <div className="bg-ivory-warm min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sand/30 border border-sand text-xs font-semibold text-charcoal">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Artisan & Mineral Supplier Onboarding</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal leading-tight">
            Bring Your Craft & Materials to a Conscious World Stage.
          </h1>

          <p className="text-sm sm:text-base text-secondary leading-relaxed">
            RangMitti connects tribal artists, women-led cooperatives, and sustainable mineral valorization suppliers with collectors, interior architects, and creative studios.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/seller/register"
              className="px-6 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-sm font-semibold shadow-md transition-all flex items-center gap-2"
            >
              <span>Apply to Join Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/seller/login"
              className="px-6 py-3.5 rounded-xl bg-paper border border-border hover:border-terracotta text-charcoal text-sm font-semibold transition-all"
            >
              Seller Portal Login
            </Link>
          </div>
        </div>

        {/* Categories of Sellers */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              Who Can Sell on RangMitti?
            </h2>
            <p className="text-xs text-secondary mt-1">
              We welcome creators across several specialized cultural and material tracks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-paper border border-border space-y-3">
              <Users className="w-8 h-8 text-terracotta" />
              <h3 className="font-serif text-lg font-bold text-charcoal">
                Indigenous Artisans
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Traditional painters of Sohrai & Khovar, Dokra lost-wax bronze casters, terracotta sculptors, and scroll artists seeking dignified direct market access.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-paper border border-border space-y-3">
              <Layers className="w-8 h-8 text-forest" />
              <h3 className="font-serif text-lg font-bold text-charcoal">
                Mineral Material Suppliers
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Facilities, cooperatives, or academic labs purifying mineral by-products, iron ore beneficiation slimes, or kaolin clay washes into certified pigment batches.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-paper border border-border space-y-3">
              <HeartHandshake className="w-8 h-8 text-sand-dark" />
              <h3 className="font-serif text-lg font-bold text-charcoal">
                Co-ops & Self-Help Groups
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Rural community collectives, tribal craft federations, and women's livelihood initiatives in Jharkhand with authentic handcrafted production capability.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="p-8 rounded-3xl bg-paper border border-sand shadow-sm space-y-6">
          <h3 className="font-serif text-xl font-bold text-charcoal text-center">
            The RangMitti Artisan Advantage
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-secondary">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" />
              <div>
                <strong className="text-charcoal block">Digital Passport Generation:</strong>
                Every approved item receives a verified QR passport documenting your authorship and material origin.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" />
              <div>
                <strong className="text-charcoal block">Fair Pricing Guarantee:</strong>
                Transparent pricing structures where creators retain up to 80% of retail sales value.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" />
              <div>
                <strong className="text-charcoal block">Safety-Screened Material Access:</strong>
                Access standardized, non-toxic mineral pigments at subsidized pilot cooperative rates.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" />
              <div>
                <strong className="text-charcoal block">Logistics & Archival Packaging:</strong>
                We provide custom acid-free packing boxes and manage domestic courier pickups from your workshop.
              </div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-border">
            <Link
              href="/seller/register"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold shadow-sm"
            >
              Submit Seller Application →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
