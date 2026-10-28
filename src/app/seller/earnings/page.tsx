'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Download, ShieldCheck, Sparkles } from 'lucide-react';

export default function SellerEarningsPage() {
  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Simulated Artisan Earnings & Settlements
            </h1>
            <p className="text-xs text-secondary mt-1">
              Transparent direct remuneration logs for the Idea Tribe 2026 presentation
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

        {/* Top Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-paper border border-border space-y-1">
            <span className="text-xs text-secondary font-semibold">Total Net Remuneration</span>
            <p className="font-serif text-3xl font-bold text-charcoal">₹38,800</p>
            <p className="text-[10px] text-forest font-semibold">Simulated direct artisan share (80%)</p>
          </div>

          <div className="p-6 rounded-2xl bg-paper border border-border space-y-1">
            <span className="text-xs text-secondary font-semibold">Pending Settlement</span>
            <p className="font-serif text-3xl font-bold text-charcoal">₹3,880</p>
            <p className="text-[10px] text-secondary">Awaiting customer receipt verification</p>
          </div>

          <div className="p-6 rounded-2xl bg-paper border border-border space-y-1">
            <span className="text-xs text-secondary font-semibold">Disbursed to Bank</span>
            <p className="font-serif text-3xl font-bold text-forest">₹34,920</p>
            <p className="text-[10px] text-secondary">Settled directly via NEFT (Demo)</p>
          </div>
        </div>

        {/* Ledger */}
        <div className="p-6 rounded-2xl bg-paper border border-border space-y-4">
          <h3 className="font-serif text-base font-bold text-charcoal pb-2 border-b border-border">
            Recent Settlement Ledger (Illustrative Demo)
          </h3>

          <div className="divide-y divide-border text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-charcoal">Settlement #RM-PAY-2026-08</p>
                <p className="text-secondary">Sohrai Canvas (RM-ORD-2026-9041)</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-forest text-sm">+₹3,880</span>
                <p className="text-[10px] text-secondary">Settlement Pending</p>
              </div>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-charcoal">Settlement #RM-PAY-2026-04</p>
                <p className="text-secondary">Khovar Panel (RM-ORD-2026-8812)</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-forest text-sm">+₹3,520</span>
                <p className="text-[10px] text-forest">Disbursed on 14 Mar 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
