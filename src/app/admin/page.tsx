'use client';

import React from 'react';
import Link from 'next/link';
import { sampleProducts } from '@/data/products';
import { sampleMaterials } from '@/data/materials';
import { sampleArtisans } from '@/data/artisans';
import { 
  ShieldCheck, 
  Package, 
  FlaskConical, 
  Users, 
  ShoppingBag, 
  QrCode, 
  Layers, 
  FileCheck, 
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';

export default function AdminOverviewPage() {
  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="p-8 rounded-3xl bg-paper border border-sand shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-forest/20 border-2 border-forest flex items-center justify-center text-forest font-serif font-bold text-2xl">
              AD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  Platform Admin Control Center
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-forest text-paper font-bold text-[10px]">
                  Idea Tribe 2026 Jury Console
                </span>
              </div>
              <p className="text-xs text-secondary mt-1">
                Material validation workflows, curation review queues, passport ledger, and pilot analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/admin/material-tests"
              className="px-4 py-2 rounded-xl bg-forest hover:bg-forest-deep text-paper font-semibold shadow-sm flex items-center gap-1.5"
            >
              <FlaskConical className="w-4 h-4" />
              Batch Lab Logs
            </Link>
            <Link
              href="/admin/products"
              className="px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper font-semibold shadow-sm flex items-center gap-1.5"
            >
              <FileCheck className="w-4 h-4" />
              Review Queue (1)
            </Link>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-2">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-xs font-semibold">Total Creations</span>
              <Package className="w-4 h-4 text-terracotta" />
            </div>
            <p className="font-serif text-3xl font-bold text-charcoal">{sampleProducts.length}</p>
            <p className="text-[10px] text-forest font-semibold">100% Attached to active passports</p>
          </div>

          <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-2">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-xs font-semibold">Material Batches</span>
              <FlaskConical className="w-4 h-4 text-forest" />
            </div>
            <p className="font-serif text-3xl font-bold text-charcoal">{sampleMaterials.length}</p>
            <p className="text-[10px] text-forest font-semibold">5 Validated • 1 Testing in Progress</p>
          </div>

          <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-2">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-xs font-semibold">Verified Artisans</span>
              <Users className="w-4 h-4 text-sand-dark" />
            </div>
            <p className="font-serif text-3xl font-bold text-charcoal">{sampleArtisans.length}</p>
            <p className="text-[10px] text-secondary">Across Santhal, Munda & Ho traditions</p>
          </div>

          <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-2">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-xs font-semibold">Simulated Order Vol</span>
              <ShoppingBag className="w-4 h-4 text-charcoal" />
            </div>
            <p className="font-serif text-3xl font-bold text-charcoal">₹48,250</p>
            <p className="text-[10px] text-secondary">Fair-trade community disbursement ledger</p>
          </div>
        </div>

        {/* Admin Navigation Hub */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs font-semibold">
          <Link
            href="/admin/products"
            className="p-3 rounded-xl bg-paper border border-border hover:border-terracotta hover:bg-ivory-warm text-center transition-all"
          >
            <FileCheck className="w-5 h-5 mx-auto mb-1 text-terracotta" />
            <span>Product Approvals</span>
          </Link>

          <Link
            href="/admin/materials"
            className="p-3 rounded-xl bg-paper border border-border hover:border-forest hover:bg-ivory-warm text-center transition-all"
          >
            <Layers className="w-5 h-5 mx-auto mb-1 text-forest" />
            <span>Material Batches</span>
          </Link>

          <Link
            href="/admin/material-tests"
            className="p-3 rounded-xl bg-paper border border-border hover:border-forest hover:bg-ivory-warm text-center transition-all"
          >
            <FlaskConical className="w-5 h-5 mx-auto mb-1 text-forest" />
            <span>Lab Test Records</span>
          </Link>

          <Link
            href="/admin/passports"
            className="p-3 rounded-xl bg-paper border border-border hover:border-terracotta hover:bg-ivory-warm text-center transition-all"
          >
            <QrCode className="w-5 h-5 mx-auto mb-1 text-terracotta" />
            <span>Passport Ledger</span>
          </Link>

          <Link
            href="/admin/orders"
            className="p-3 rounded-xl bg-paper border border-border hover:border-sand hover:bg-ivory-warm text-center transition-all"
          >
            <ShoppingBag className="w-5 h-5 mx-auto mb-1 text-sand-dark" />
            <span>Order Logistics</span>
          </Link>

          <Link
            href="/admin/settings"
            className="p-3 rounded-xl bg-paper border border-border hover:border-charcoal hover:bg-ivory-warm text-center transition-all"
          >
            <Sparkles className="w-5 h-5 mx-auto mb-1 text-charcoal" />
            <span>Platform Settings</span>
          </Link>
        </div>

        {/* Live Queues: 1. Pending Product Review, 2. Pilot Validation Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Queue 1: Pending Product Review */}
          <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
                <Clock className="w-4 h-4 text-terracotta" />
                Curation Review Queue (1 Item)
              </h3>
              <Link href="/admin/products" className="text-xs text-terracotta hover:underline font-semibold">
                Open Full Queue →
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-ivory-warm border border-border space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-charcoal">Sal Bough & Striped Deer Sohrai Panel</span>
                <span className="px-2 py-0.5 rounded bg-sand/30 text-sand-dark font-bold text-[10px]">
                  Pending Leachate Report
                </span>
              </div>
              <p className="text-secondary text-[11px]">
                Submitted by master artisan Shanti Soren • Proposed Retail: ₹3,600
              </p>
              <p className="text-[11px] text-terracotta font-medium">
                Binder: BATCH-2026-LT-PILOT (Currently undergoing 28-day heavy metals incubation at CSIR-NML).
              </p>
            </div>
          </div>

          {/* Queue 2: Active Mineral Validation Pilot Streams */}
          <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-forest" />
                Active Material Stream Status
              </h3>
              <Link href="/admin/material-tests" className="text-xs text-forest hover:underline font-semibold">
                All Lab Audits →
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-ivory-warm border border-border flex items-center justify-between">
                <div>
                  <p className="font-bold text-charcoal">BATCH-2026-FE-08 (Chiriya Red Ochre)</p>
                  <p className="text-[11px] text-secondary">TCLP Heavy Metals Leaching: &lt; 0.01 mg/L</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-forest text-paper text-[10px] font-bold">
                  Validated
                </span>
              </div>

              <div className="p-3 rounded-xl bg-ivory-warm border border-border flex items-center justify-between">
                <div>
                  <p className="font-bold text-charcoal">BATCH-2026-LT-PILOT (Saranda Laterite)</p>
                  <p className="text-[11px] text-secondary">Stage 2 Toxicity Assay: Day 18 of 28</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-sand-dark text-paper text-[10px] font-bold">
                  Testing In Progress
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
