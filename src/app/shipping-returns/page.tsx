'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Truck, RotateCcw, ShieldCheck } from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <div className="bg-ivory-warm min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-paper border border-border shadow-sm space-y-6 text-xs text-secondary leading-relaxed">
        <Link href="/" className="inline-flex items-center text-terracotta font-semibold hover:underline">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to RangMitti Home
        </Link>

        <h1 className="font-serif text-3xl font-bold text-charcoal">Shipping & Returns Policy</h1>

        <div className="space-y-4 pt-2">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-ivory-warm border border-border">
            <Truck className="w-5 h-5 text-forest shrink-0 mt-0.5" />
            <div>
              <h2 className="font-serif text-sm font-bold text-charcoal">Archival Packing & Domestic Dispatch</h2>
              <p className="mt-1">
                Because our artworks use delicate mineral pigments and handloom canvas, all items are wrapped in acid-free glassine interleaf and shipped in custom shock-absorbing recyclable containers. Domestic transit takes 3–5 business days across India. Free shipping applies to orders over ₹999.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-ivory-warm border border-border">
            <RotateCcw className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
            <div>
              <h2 className="font-serif text-sm font-bold text-charcoal">7-Day Transit Damage & Authenticity Guarantee</h2>
              <p className="mt-1">
                If an artwork arrives damaged in transit or if a physical QR seal fails verification, we offer full replacement or refund within 7 calendar days of verified carrier delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
