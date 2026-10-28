'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  QrCode, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  FileText
} from 'lucide-react';
import QRCodeDisplay from '@/components/passport/QRCodeDisplay';
import { samplePassports } from '@/data/passports';

export default function PassportShowcaseSection() {
  const [currentUrl, setCurrentUrl] = useState('https://rangmitti.in/passport/RM-001-ART-007');
  const passport = samplePassports['RM-001-ART-007'];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(`${window.location.origin}/passport/RM-001-ART-007`);
    }
  }, []);

  return (
    <section className="py-20 bg-paper border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Description Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-semibold">
              <QrCode className="w-3.5 h-3.5" />
              <span>Signature Innovation</span>
              <span className="opacity-40">•</span>
              <span>Digital Provenance Passport</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
              Every creation has a story. <br />
              <span className="italic text-terracotta">Every batch has a passport.</span>
            </h2>

            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              The RangMitti Passport is a permanent digital ledger entry connecting physical artwork to its mineral origin, laboratory safety clearance, processing journey, artisan identity, and authenticity token.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 text-xs text-charcoal">
                <CheckCircle2 className="w-4 h-4 text-forest mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold">Raw Material Batch Traceability:</span> Links the specific mineral recovery pond, GPS coordinates, and chemical screening certificate.
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs text-charcoal">
                <CheckCircle2 className="w-4 h-4 text-forest mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold">Artisan Authorship Protection:</span> Directly credits the creator, clan, and cultural tradition with permanent public records.
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs text-charcoal">
                <CheckCircle2 className="w-4 h-4 text-forest mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold">Consumer Confidence:</span> Customers scan the physical tamper-evident seal with their smartphone camera to verify everything on the spot.
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/passport/RM-001-ART-007"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-charcoal hover:bg-charcoal-soft text-paper text-sm font-semibold transition-all shadow-md"
              >
                Explore Sample Passport (Live)
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              
              <Link
                href="/passport/verify"
                className="inline-flex items-center px-4 py-3 rounded-xl border border-border hover:border-terracotta text-charcoal hover:text-terracotta text-sm font-semibold transition-all"
              >
                Verify Any Passport ID
              </Link>
            </div>
          </div>

          {/* Right Live Interactive Passport Showcase Card */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative shadow */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-sand/20 via-clay-muted to-forest/10 blur-xl" />

              <div className="relative rounded-2xl bg-ivory-warm border border-sand/60 shadow-2xl overflow-hidden p-6 sm:p-8">
                {/* Passport Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-terracotta flex items-center justify-center text-paper font-serif font-bold text-sm">
                      RM
                    </div>
                    <div>
                      <p className="font-serif text-sm font-bold text-charcoal">
                        RangMitti Passport™
                      </p>
                      <p className="text-[10px] text-secondary font-mono">
                        ID: {passport.passportId}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-forest/15 text-forest text-[11px] font-bold flex items-center gap-1 border border-forest/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Safe
                  </span>
                </div>

                {/* Passport Body */}
                <div className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  {/* Left: Product & Batch Brief */}
                  <div className="sm:col-span-7 space-y-3">
                    <div className="relative h-28 w-full rounded-xl overflow-hidden border border-border">
                      <Image
                        src={passport.image}
                        alt={passport.productName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="font-serif text-base font-bold text-charcoal line-clamp-1">
                        {passport.productName}
                      </h4>
                      <p className="text-[11px] text-secondary">
                        Artisan: <span className="font-semibold text-charcoal">{passport.artisanDetails?.name}</span>
                      </p>
                      <p className="text-[11px] text-secondary">
                        Origin: Saranda Iron Basin, West Singhbhum
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-paper border border-border/70 text-[10px] space-y-1">
                      <p className="font-mono font-bold text-terracotta">
                        {passport.materialBatch.batchNumber}
                      </p>
                      <p className="text-secondary leading-tight">
                        TCLP Heavy Metals Leaching: Pass (Pb, Cd, As &lt; 0.01 mg/L)
                      </p>
                    </div>
                  </div>

                  {/* Right: Live Interactive QR Code */}
                  <div className="sm:col-span-5 flex flex-col items-center justify-center text-center p-3 rounded-xl bg-paper border border-border">
                    <QRCodeDisplay passportId={passport.passportId} size={130} />
                    <p className="text-[10px] font-bold text-charcoal mt-1">
                      Scan with Phone Camera
                    </p>
                    <p className="text-[9px] text-secondary leading-tight">
                      Or click Simulate Phone Scan
                    </p>
                  </div>
                </div>

                {/* Passport Footer Info */}
                <div className="pt-4 border-t border-border flex items-center justify-between text-[11px]">
                  <div className="flex items-center space-x-1.5 text-secondary">
                    <FileText className="w-3.5 h-3.5 text-forest" />
                    <span>Reference: CSIR-NML Protocol Pilot</span>
                  </div>
                  <Link
                    href={`/passport/${passport.passportId}`}
                    className="font-semibold text-terracotta hover:underline flex items-center gap-1"
                  >
                    <span>Full Ledger View</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
