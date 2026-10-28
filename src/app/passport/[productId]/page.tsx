'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { samplePassports } from '@/data/passports';
import QRCodeDisplay from '@/components/passport/QRCodeDisplay';
import { 
  ShieldCheck, 
  QrCode, 
  Printer, 
  Download, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  FileText, 
  AlertTriangle,
  ArrowLeft,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function PassportDetailPage() {
  const params = useParams();
  const rawId = (params?.productId as string) || '';
  const passportId = decodeURIComponent(rawId).toUpperCase();

  const passport = samplePassports[passportId];
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [passportId]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Unknown ID handling
  if (!passport) {
    return (
      <div className="bg-ivory-warm min-h-screen py-16 px-4">
        <div className="max-w-xl mx-auto text-center p-8 rounded-2xl bg-paper border border-border shadow-lg space-y-4">
          <div className="w-12 h-12 rounded-full bg-sand/30 flex items-center justify-center mx-auto text-terracotta">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h1 className="font-serif text-2xl font-bold text-charcoal">
            Passport Record Not Found
          </h1>

          <p className="text-sm text-secondary">
            No registered provenance entry exists for passport identifier <span className="font-mono font-bold text-charcoal">"{passportId}"</span>.
          </p>

          <p className="text-xs text-secondary">
            You may be testing an unseeded ID or simulated code. Please explore one of our verified Idea Tribe 2026 demo passports below:
          </p>

          <div className="space-y-2 pt-2 text-left">
            {Object.keys(samplePassports).map((key) => (
              <Link
                key={key}
                href={`/passport/${key}`}
                className="flex items-center justify-between p-3 rounded-xl bg-ivory-warm hover:bg-clay-muted border border-border text-xs transition-colors"
              >
                <div>
                  <p className="font-mono font-bold text-terracotta">{key}</p>
                  <p className="text-secondary">{samplePassports[key].productName}</p>
                </div>
                <span className="text-terracotta font-semibold">Inspect →</span>
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <Link
              href="/passport/verify"
              className="inline-flex items-center text-xs font-semibold text-terracotta hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Return to Passport Verification Desk
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory-warm min-h-screen py-10 print:bg-white print:py-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 print-passport">
        {/* Top Control Bar (Hidden on Print) */}
        <div className="no-print flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-border gap-4">
          <Link
            href="/passport/verify"
            className="inline-flex items-center text-xs font-semibold text-secondary hover:text-terracotta"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Passport Verification Portal
          </Link>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-paper border border-border hover:border-terracotta text-charcoal hover:text-terracotta text-xs font-semibold shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4 mr-1.5" />
              Print Certificate
            </button>
            <Link
              href="/art"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold shadow-sm transition-colors"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>

        {/* Demo Notice Banner */}
        <div className="no-print mb-6 p-3 rounded-xl bg-sand/20 border border-sand/50 text-xs text-charcoal flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-terracotta shrink-0" />
            <span>
              <strong>Idea Tribe 2026 Verified Demonstration Passport.</strong> Publicly resolvable cryptographic provenance record.
            </span>
          </div>
          <span className="font-mono text-[10px] bg-paper px-2 py-0.5 rounded border border-sand">
            DEMO DATA
          </span>
        </div>

        {/* The Official Certificate Card */}
        <div className="rounded-3xl bg-paper border-2 border-sand p-6 sm:p-10 shadow-2xl space-y-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b-2 border-border gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-terracotta flex items-center justify-center text-paper font-serif font-bold text-2xl shadow-md">
                RM
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-secondary">
                  Official Provenance Certificate
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  RangMitti Passport™
                </h1>
                <p className="text-xs text-secondary font-mono mt-0.5">
                  Universal ID: <strong className="text-terracotta">{passport.passportId}</strong>
                </p>
              </div>
            </div>

            {/* QR Code + Verification Status */}
            <div className="flex items-center space-x-4 self-end sm:self-auto bg-ivory-warm p-3 rounded-2xl border border-border">
              <QRCodeDisplay passportId={passport.passportId} size={90} showDownload={true} />
              <div className="space-y-1 text-left">
                <span className="px-2.5 py-0.5 rounded-full bg-forest text-paper text-[10px] font-bold inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {passport.status}
                </span>
                <p className="text-[10px] text-secondary">Scan to verify authenticity</p>
                <p className="text-[9px] font-mono text-secondary">Token: {passport.verificationToken.slice(0, 14)}...</p>
              </div>
            </div>
          </div>

          {/* Core Product Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-ivory-warm p-6 rounded-2xl border border-border">
            <div className="md:col-span-4 relative h-48 w-full rounded-xl overflow-hidden bg-clay-muted">
              <Image
                src={passport.image}
                alt={passport.productName}
                fill
                className="object-cover"
              />
            </div>

            <div className="md:col-span-8 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta">
                Registered Artifact
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                {passport.productName}
              </h2>

              <div className="grid grid-cols-2 gap-4 text-xs text-secondary pt-1">
                <div>
                  <span className="font-semibold text-charcoal block">Master Creator:</span>
                  <span>{passport.artisanDetails?.name} ({passport.artisanDetails?.community})</span>
                </div>
                <div>
                  <span className="font-semibold text-charcoal block">Artisan Region:</span>
                  <span>{passport.artisanDetails?.region}</span>
                </div>
                <div>
                  <span className="font-semibold text-charcoal block">Passport Issue Date:</span>
                  <span>{passport.issueDate}</span>
                </div>
                <div>
                  <span className="font-semibold text-charcoal block">Last Audit Update:</span>
                  <span>{passport.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Geological Origin & Mine Source */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-border">
              <MapPin className="w-5 h-5 text-terracotta" />
              <h3 className="font-serif text-lg font-bold text-charcoal">
                Geological Sourcing Node & Mine By-Product Origin
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-paper border border-border space-y-1">
                <span className="text-[10px] text-secondary uppercase font-bold">Mining Sector / Region</span>
                <p className="font-semibold text-charcoal">{passport.geologicalOrigin.region}</p>
              </div>
              <div className="p-4 rounded-xl bg-paper border border-border space-y-1">
                <span className="text-[10px] text-secondary uppercase font-bold">Facility / Tailings Depot</span>
                <p className="font-semibold text-charcoal">{passport.geologicalOrigin.mineOrSite}</p>
              </div>
              <div className="p-4 rounded-xl bg-paper border border-border space-y-1">
                <span className="text-[10px] text-secondary uppercase font-bold">Mineral Stream Character</span>
                <p className="font-semibold text-charcoal">{passport.geologicalOrigin.mineralStream}</p>
              </div>
            </div>
          </div>

          {/* Laboratory Testing & Safety Screen Certificate */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-forest" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  Laboratory Testing & Safety Screen
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-forest bg-forest/10 px-2.5 py-0.5 rounded-full">
                Batch: {passport.materialBatch.batchNumber}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-ivory-warm border border-border space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-charcoal">Characterization Protocol Facility:</p>
                  <p className="text-secondary">{passport.materialBatch.labName}</p>
                </div>
                <div className="text-right">
                  <p className="text-secondary">Processing Date: {passport.materialBatch.processingDate}</p>
                  <p className="text-forest font-semibold">TCLP Leachability Screen: Passed (Safe)</p>
                </div>
              </div>

              <div className="p-3 bg-paper rounded-xl border border-border text-secondary leading-relaxed">
                <strong>Analysis Summary:</strong> {passport.materialBatch.testSummary}
              </div>

              <p className="text-[11px] text-secondary italic">
                *Screened exclusively for decorative art, crafts, and non-ingestive applications under RangMitti Pilot Protocol.
              </p>
            </div>
          </div>

          {/* 8-Stage Value Chain Provenance Journey */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-border">
              <FileText className="w-5 h-5 text-terracotta" />
              <h3 className="font-serif text-lg font-bold text-charcoal">
                Provenance Timeline & Verification Milestones
              </h3>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-sand">
              {passport.journeySteps.map((step) => (
                <div key={step.stepNumber} className="relative space-y-1">
                  {/* Timeline dot */}
                  <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-sand border-2 border-paper flex items-center justify-center text-[9px] font-bold text-charcoal">
                    {step.stepNumber}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                    <span className="font-bold text-charcoal">
                      {step.title}
                    </span>
                    <span className="text-[11px] font-mono text-secondary">
                      {step.date} • {step.location}
                    </span>
                  </div>

                  <p className="text-xs text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Ledger Deed Footer */}
          <div className="pt-6 border-t-2 border-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-secondary">
            <div>
              <p className="font-bold text-charcoal uppercase tracking-wider text-[10px]">
                Authenticity Cryptographic Token
              </p>
              <p className="font-mono text-terracotta text-xs break-all mt-0.5">
                {passport.verificationToken}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-bold text-charcoal uppercase tracking-wider text-[10px]">
                Governing Protocol
              </p>
              <p className="mt-0.5">
                RangMitti Pilot Ledger v2.0 • Idea Tribe 2026 Research Finalist
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="no-print mt-8 text-center space-x-4">
          <button
            onClick={handlePrint}
            className="px-6 py-3 rounded-xl bg-charcoal hover:bg-charcoal-soft text-paper text-xs font-semibold shadow-md transition-all inline-flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print / Save Verified Passport PDF
          </button>
        </div>
      </div>
    </div>
  );
}
