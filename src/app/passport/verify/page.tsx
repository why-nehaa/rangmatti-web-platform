'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { canonicalPassports } from '@/data/passports';
import { 
  ShieldCheck, 
  QrCode, 
  Search, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function PassportVerifyPage() {
  const router = useRouter();
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputCode.trim().toUpperCase();
    if (!clean) {
      setError('Please enter a Passport ID.');
      return;
    }
    router.push(`/passport/${clean}`);
  };

  return (
    <div className="bg-ivory-warm min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>RangMitti Provenance Registry</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Verify a Product Passport
          </h1>

          <p className="text-sm text-secondary leading-relaxed">
            Every creation purchased from RangMitti carries a tamper-evident QR seal and unique alphanumeric Passport ID. Enter the ID below to verify laboratory safety screening, mine origin, and artisan identity.
          </p>
        </div>

        {/* Verification Form Card */}
        <div className="p-8 rounded-3xl bg-paper border-2 border-sand shadow-xl space-y-6">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                Enter Passport ID or Token
              </label>
              <div className="relative">
                <QrCode className="w-5 h-5 text-secondary absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value);
                    setError('');
                  }}
                  placeholder="e.g. RM-001-ART-007"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-ivory-warm border border-border text-sm font-mono uppercase text-charcoal placeholder-secondary/60 focus:outline-none focus:border-terracotta"
                />
              </div>
              {error && (
                <p className="text-xs text-terracotta mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Query Public Ledger</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Passport Buttons */}
          <div className="pt-4 border-t border-border space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary">
              Or Inspect One of Our Idea Tribe 2026 Sample Passports:
            </p>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {Object.keys(canonicalPassports).map((id) => {
                const item = canonicalPassports[id];
                return (
                  <Link
                    key={id}
                    href={`/passport/${id}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-ivory-warm hover:bg-clay-muted border border-border text-xs transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-terracotta">{id}</span>
                        <span className="px-1.5 py-0.5 rounded bg-forest/10 text-forest text-[10px] font-semibold">
                          Verified
                        </span>
                      </div>
                      <p className="text-secondary text-[11px] mt-0.5 truncate max-w-sm">
                        {item.productName} (by {item.artisanDetails?.name})
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-terracotta group-hover:translate-x-1 transition-transform">
                      Inspect Record →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Informational Guidance */}
        <div className="p-4 rounded-xl bg-paper border border-border text-xs text-secondary space-y-2">
          <p className="font-semibold text-charcoal">How QR Verification Operates:</p>
          <p className="leading-relaxed">
            When you receive physical RangMitti packaging, simply point your phone's camera at the medallion QR sticker. No app installation is required—your browser will instantly resolve the official digital provenance page.
          </p>
        </div>
      </div>
    </div>
  );
}
