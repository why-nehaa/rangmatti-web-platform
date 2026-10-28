'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sampleProducts } from '@/data/products';
import { 
  Store, 
  Package, 
  TrendingUp, 
  ShoppingBag, 
  QrCode, 
  Plus, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';

export default function SellerDashboardPage() {
  const myArtworks = sampleProducts.filter((p) => p.artisanId === 'ART-001');

  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dashboard Top Header */}
        <div className="p-8 rounded-3xl bg-paper border border-sand shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-terracotta/20 border-2 border-terracotta flex items-center justify-center text-terracotta font-serif font-bold text-2xl">
              SS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  Shanti Soren Studio
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-forest/15 text-forest font-bold text-[10px]">
                  Verified Master Artisan
                </span>
              </div>
              <p className="text-xs text-secondary mt-1">
                Sohrai & Khovar Mural Art • Saranda Fringe, West Singhbhum • Batch Partner: RM-FE-08
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/seller/products/new"
              className="px-4 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              List New Creation
            </Link>
          </div>
        </div>

        {/* Analytics Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-2">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-xs font-semibold">Simulated Revenue</span>
              <TrendingUp className="w-4 h-4 text-forest" />
            </div>
            <p className="font-serif text-3xl font-bold text-charcoal">₹38,800</p>
            <p className="text-[10px] text-forest font-semibold">
              +14% vs last calendar cycle (Demo Data)
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-2">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-xs font-semibold">Live Catalogue Items</span>
              <Package className="w-4 h-4 text-terracotta" />
            </div>
            <p className="font-serif text-3xl font-bold text-charcoal">{myArtworks.length}</p>
            <p className="text-[10px] text-secondary">All bound to active passports</p>
          </div>

          <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-2">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-xs font-semibold">Orders Fulfilled</span>
              <ShoppingBag className="w-4 h-4 text-sand-dark" />
            </div>
            <p className="font-serif text-3xl font-bold text-charcoal">9</p>
            <p className="text-[10px] text-forest font-semibold">100% On-time dispatch</p>
          </div>

          <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-2">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-xs font-semibold">Under Review / Drafts</span>
              <Clock className="w-4 h-4 text-secondary" />
            </div>
            <p className="font-serif text-3xl font-bold text-charcoal">1</p>
            <p className="text-[10px] text-secondary">Pending lab pigment verification</p>
          </div>
        </div>

        {/* Navigation Tabs for Seller */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-3 text-xs font-semibold">
          <Link
            href="/seller/dashboard"
            className="px-4 py-2 rounded-lg bg-terracotta text-paper"
          >
            Overview
          </Link>
          <Link
            href="/seller/products"
            className="px-4 py-2 rounded-lg bg-paper text-charcoal hover:bg-ivory-warm border border-border"
          >
            My Creations & Passports ({myArtworks.length})
          </Link>
          <Link
            href="/seller/orders"
            className="px-4 py-2 rounded-lg bg-paper text-charcoal hover:bg-ivory-warm border border-border"
          >
            Orders & Packaging
          </Link>
          <Link
            href="/seller/inventory"
            className="px-4 py-2 rounded-lg bg-paper text-charcoal hover:bg-ivory-warm border border-border"
          >
            Inventory Stock
          </Link>
          <Link
            href="/seller/earnings"
            className="px-4 py-2 rounded-lg bg-paper text-charcoal hover:bg-ivory-warm border border-border"
          >
            Simulated Payouts
          </Link>
          <Link
            href="/seller/profile"
            className="px-4 py-2 rounded-lg bg-paper text-charcoal hover:bg-ivory-warm border border-border"
          >
            Artisan Profile & Bio
          </Link>
        </div>

        {/* Current Active Product Listings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-charcoal">
              My Active Artworks on RangMitti
            </h2>
            <Link href="/seller/products" className="text-xs font-semibold text-terracotta hover:underline">
              Manage All Products →
            </Link>
          </div>

          <div className="rounded-2xl bg-paper border border-border divide-y divide-border overflow-hidden shadow-sm">
            {myArtworks.map((prd) => (
              <div key={prd.id} className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="relative h-16 w-16 rounded-xl bg-clay-muted overflow-hidden shrink-0 border border-border">
                    <Image src={prd.images[0]} alt={prd.title} fill className="object-cover" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-terracotta">
                        {prd.category}
                      </span>
                      <span className="px-2 py-0.2 rounded-full bg-forest/15 text-forest text-[10px] font-semibold">
                        Published
                      </span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-charcoal">
                      <Link href={`/product/${prd.slug}`}>{prd.title}</Link>
                    </h3>
                    <p className="text-xs text-secondary">
                      Stock: {prd.stock} units • Material Batch: {prd.materialBatchId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-end sm:self-center">
                  <Link
                    href={`/passport/${prd.passportId}`}
                    className="px-3 py-1.5 rounded-lg bg-ivory-warm border border-border text-xs font-semibold text-charcoal hover:text-terracotta flex items-center gap-1"
                  >
                    <QrCode className="w-3.5 h-3.5 text-terracotta" />
                    <span>Passport: {prd.passportId}</span>
                  </Link>

                  <span className="font-serif text-lg font-bold text-charcoal min-w-[80px] text-right">
                    ₹{prd.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Material Batches Section */}
        <div className="p-6 rounded-2xl bg-paper border border-border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-forest" />
              <h3 className="font-serif text-lg font-bold text-charcoal">
                Assigned Material Batch Allotments
              </h3>
            </div>
            <span className="text-xs text-secondary">Tested by CSIR-NML Reference Protocol</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-ivory-warm border border-border space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-terracotta">BATCH-2026-FE-08</span>
                <span className="px-2 py-0.5 rounded bg-forest text-paper text-[10px] font-bold">
                  Validated
                </span>
              </div>
              <p className="font-semibold text-charcoal">Chiriya Iron-Ochre Pigment (Fine Milled)</p>
              <p className="text-secondary text-[11px]">
                Heavy Metals (TCLP): Passed. Allotted: 10 kg (Balance: 4.2 kg in studio).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-ivory-warm border border-border space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-terracotta">BATCH-2026-KL-12</span>
                <span className="px-2 py-0.5 rounded bg-forest text-paper text-[10px] font-bold">
                  Validated
                </span>
              </div>
              <p className="font-semibold text-charcoal">Singhbhum Kaolin Bone White Slurry</p>
              <p className="text-secondary text-[11px]">
                Hydraulic cyclone washed. Allotted: 15 L (Balance: 6.8 L in studio).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
