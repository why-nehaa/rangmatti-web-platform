'use client';

import React from 'react';
import Link from 'next/link';
import { samplePassports } from '@/data/passports';
import { ArrowLeft, QrCode, ShieldCheck, ExternalLink, Printer } from 'lucide-react';

export default function AdminPassportsPage() {
  const passports = Object.values(samplePassports);

  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              RangMitti Passport Ledger Registry
            </h1>
            <p className="text-xs text-secondary mt-1">
              Active cryptographically resolved provenance tokens and QR seals
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

        <div className="rounded-3xl bg-paper border border-border shadow-sm divide-y divide-border overflow-hidden">
          {passports.map((p) => (
            <div key={p.passportId} className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
              <div className="space-y-1 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-terracotta text-sm">{p.passportId}</span>
                  <span className="px-2 py-0.5 rounded-full bg-forest/15 text-forest font-semibold text-[10px]">
                    {p.status}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-charcoal">{p.productName}</h3>
                <p className="text-secondary">
                  Artisan: {p.artisanDetails?.name} • Mine Node: {p.geologicalOrigin.mineOrSite}
                </p>
                <p className="font-mono text-[10px] text-secondary break-all">
                  Hash: {p.verificationToken}
                </p>
              </div>

              <div className="flex items-center space-x-3 self-end md:self-center">
                <Link
                  href={`/passport/${p.passportId}`}
                  className="px-4 py-2 rounded-xl bg-ivory-warm border border-border hover:border-terracotta text-charcoal hover:text-terracotta font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Public Record
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
