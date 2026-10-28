'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ArrowLeft, QrCode, CheckCircle2 } from 'lucide-react';

export default function SellerOrdersPage() {
  const sellerOrders = [
    {
      id: 'RM-ORD-2026-9041',
      productName: 'Sohrai Forest & Birds Motif - Hand-Painted Canvas',
      customer: 'Aarav Sharma (Ranchi, Jharkhand)',
      qty: 1,
      payout: 3880,
      passportId: 'RM-001-ART-007',
      status: 'Awaiting Packaging Inspection',
      trackingRef: 'RM-DEL-778942-IN',
    },
    {
      id: 'RM-ORD-2026-8812',
      productName: 'Khovar Bridal Wall Panel - Comb-Carved Gesso Relief',
      customer: 'Dr. Neha Verma (Bhubaneswar, Odisha)',
      qty: 1,
      payout: 3520,
      passportId: 'RM-005-ART-045',
      status: 'Dispatched via Courier',
      trackingRef: 'RM-DEL-551299-IN',
    },
  ];

  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Seller Orders & Dispatch
            </h1>
            <p className="text-xs text-secondary mt-1">
              Fulfill customer purchases using RangMitti tamper-evident QR packaging seals
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

        <div className="space-y-4">
          {sellerOrders.map((ord) => (
            <div
              key={ord.id}
              className="p-6 rounded-2xl bg-paper border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="space-y-2 w-full md:w-auto">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-terracotta">{ord.id}</span>
                  <span className="px-2 py-0.5 rounded-full bg-forest/15 text-forest font-semibold text-[10px]">
                    {ord.status}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-charcoal">{ord.productName}</h3>
                <p className="text-xs text-secondary">
                  Buyer: {ord.customer} • Qty: {ord.qty}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-secondary pt-1">
                  <span className="font-mono">Tracking: {ord.trackingRef}</span>
                  <span>•</span>
                  <Link href={`/passport/${ord.passportId}`} className="text-terracotta hover:underline font-semibold flex items-center gap-1">
                    <QrCode className="w-3 h-3" />
                    Passport Seal: {ord.passportId}
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-6 self-end md:self-center">
                <div className="text-right">
                  <p className="text-[10px] text-secondary font-semibold uppercase">Artisan Payout</p>
                  <p className="font-serif text-xl font-bold text-charcoal">₹{ord.payout.toLocaleString('en-IN')}</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-forest hover:bg-forest-deep text-paper text-xs font-semibold shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Print QR Seal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
