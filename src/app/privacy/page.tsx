'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ivory-warm min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-paper border border-border shadow-sm space-y-6 text-xs text-secondary leading-relaxed">
        <Link href="/" className="inline-flex items-center text-terracotta font-semibold hover:underline">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to RangMitti Home
        </Link>

        <h1 className="font-serif text-3xl font-bold text-charcoal">Privacy Policy</h1>
        <p className="text-[11px] text-secondary">Effective Date: Idea Tribe 2026 Academic Pilot Edition</p>

        <div className="space-y-4 pt-2">
          <h2 className="font-serif text-base font-bold text-charcoal">1. Data Collected for Research & Demo</h2>
          <p>
            RangMitti collects customer order details (such as simulated names and delivery addresses) solely to demonstrate the end-to-end commerce and digital passport workflow. We never sell or share user contact data with third-party advertising networks.
          </p>

          <h2 className="font-serif text-base font-bold text-charcoal">2. Artisan Consent & Public Attribution</h2>
          <p>
            All artisan profiles displayed on public RangMitti Passports are published under formal co-design consent agreements that protect indigenous intellectual property and provide permanent creator recognition.
          </p>

          <h2 className="font-serif text-base font-bold text-charcoal">3. Payment Credentials Security</h2>
          <p>
            This demo platform uses safe simulated payment options. No real credit card, CVV, or banking credentials are collected, processed, or stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}
