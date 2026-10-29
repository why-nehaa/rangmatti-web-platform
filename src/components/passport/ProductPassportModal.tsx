'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import QRCode from 'qrcode';
import { findPassport } from '@/data/passports';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  Smartphone, 
  Wifi, 
  MapPin, 
  Calendar, 
  Layers, 
  UserCheck, 
  Check, 
  Copy, 
  ExternalLink,
  Sparkles,
  RefreshCw,
  Clock,
  Printer
} from 'lucide-react';

interface ProductPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  passportId?: string;
  productId?: string;
  productTitle?: string;
}

export default function ProductPassportModal({
  isOpen,
  onClose,
  passportId = 'RM-001-ART-007',
  productId,
  productTitle,
}: ProductPassportModalProps) {
  const [activeTab, setActiveTab] = useState<'scan' | 'virtual'>('scan');
  const [lanIp, setLanIp] = useState<string>('10.73.68.75');
  const [targetMode, setTargetMode] = useState<'lan' | 'local' | 'custom'>('local');
  const [customHost, setCustomHost] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [resolvedUrl, setResolvedUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<'scanning' | 'resolved'>('scanning');

  // Resolve passport data
  const passport = findPassport(passportId) || (productId ? findPassport(productId) : undefined);
  const finalPassportId = passport?.passportId || passportId;

  // Fetch detected host Wi-Fi IP
  useEffect(() => {
    fetch('/api/network-info')
      .then((res) => res.json())
      .then((data) => {
        if (data.primaryIp) setLanIp(data.primaryIp);
      })
      .catch(() => setLanIp('10.73.68.75'));
  }, []);

  // Compute QR URL and generate Data URL
  useEffect(() => {
    let finalUrl = '';
    const cleanPath = `/passport/${finalPassportId}`;

    if (targetMode === 'lan') {
      finalUrl = `http://${lanIp}:3000${cleanPath}`;
    } else if (targetMode === 'local') {
      if (typeof window !== 'undefined') {
        finalUrl = `${window.location.origin}${cleanPath}`;
      } else {
        finalUrl = `http://localhost:3000${cleanPath}`;
      }
    } else if (targetMode === 'custom' && customHost) {
      finalUrl = customHost.startsWith('http')
        ? `${customHost.replace(/\/$/, '')}${cleanPath}`
        : `https://${customHost.replace(/\/$/, '')}${cleanPath}`;
    } else {
      finalUrl = `http://${lanIp}:3000${cleanPath}`;
    }

    setResolvedUrl(finalUrl);

    QRCode.toDataURL(
      finalUrl,
      {
        width: 320,
        margin: 1,
        color: { dark: '#282923', light: '#FFFEFB' },
      },
      (err, src) => {
        if (!err && src) setQrDataUrl(src);
      }
    );
  }, [targetMode, lanIp, customHost, finalPassportId]);

  // Virtual scan auto-resolve
  const handleStartVirtualScan = () => {
    setActiveTab('virtual');
    setScanStep('scanning');
    setTimeout(() => {
      setScanStep('resolved');
    }, 1100);
  };

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(resolvedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-paper rounded-3xl border-2 border-sand shadow-2xl overflow-hidden text-charcoal my-auto">
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-ivory-warm border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-terracotta text-paper flex items-center justify-center font-serif font-bold text-lg shadow-sm">
              RM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                  Digital Provenance Passport
                </span>
                <span className="px-2 py-0.5 rounded-full bg-forest/15 text-forest font-mono text-[9px] font-bold">
                  ✓ VERIFIED
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-charcoal truncate max-w-md">
                {passport?.productName || productTitle || 'RangMitti Product Passport'}
              </h2>
              <p className="text-xs text-secondary font-mono">
                Passport ID: <strong className="text-terracotta">{finalPassportId}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-clay-muted text-secondary hover:text-charcoal transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Switch */}
        <div className="flex border-b border-border bg-ivory-warm/40 p-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('scan')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'scan'
                ? 'bg-paper text-terracotta border border-border shadow-sm'
                : 'text-secondary hover:text-charcoal'
            }`}
          >
            <QrCode className="w-4 h-4 text-terracotta" />
            <span>Scan with Phone (Live QR)</span>
          </button>
          <button
            onClick={handleStartVirtualScan}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'virtual'
                ? 'bg-paper text-terracotta border border-border shadow-sm'
                : 'text-secondary hover:text-charcoal'
            }`}
          >
            <Smartphone className="w-4 h-4 text-terracotta" />
            <span>Virtual Scan (Instant Demo)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto">
          {activeTab === 'scan' ? (
            /* PHONE SCAN VIEW */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column: QR Code + Mode Switcher */}
              <div className="md:col-span-5 flex flex-col items-center text-center p-4 rounded-2xl bg-ivory-warm border border-border">
                {/* Target Mode Selector */}
                <div className="flex items-center space-x-1 p-1 rounded-lg bg-paper border border-border mb-3 text-[10px] font-semibold">
                  <button
                    onClick={() => setTargetMode('lan')}
                    className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
                      targetMode === 'lan' ? 'bg-terracotta text-paper' : 'text-secondary hover:text-charcoal'
                    }`}
                    title="Encode host Wi-Fi IP for real mobile phone scanning"
                  >
                    <Wifi className="w-2.5 h-2.5" />
                    <span>Mobile Wi-Fi</span>
                  </button>
                  <button
                    onClick={() => setTargetMode('local')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      targetMode === 'local' ? 'bg-terracotta text-paper' : 'text-secondary hover:text-charcoal'
                    }`}
                  >
                    Localhost
                  </button>
                </div>

                {/* QR Code Canvas */}
                <div className="p-3 rounded-2xl bg-paper border-2 border-sand shadow-md">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt={`QR code for passport ${finalPassportId}`}
                      className="w-48 h-48 rounded-xl object-contain"
                    />
                  ) : (
                    <div className="w-48 h-48 flex items-center justify-center bg-ivory-warm text-secondary text-xs rounded-xl animate-pulse">
                      Generating QR...
                    </div>
                  )}
                </div>

                {/* Target URL with Copy Button */}
                <div className="mt-3 flex items-center space-x-1.5 text-[10px] text-secondary max-w-full">
                  <span className="truncate font-mono" title={resolvedUrl}>
                    {resolvedUrl.replace(/^https?:\/\//, '')}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1 rounded hover:bg-clay-muted text-charcoal shrink-0"
                    title="Copy Link"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-forest" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Direct Actions */}
                <div className="mt-4 flex flex-col w-full gap-2">
                  <button
                    onClick={handleStartVirtualScan}
                    className="w-full py-2 px-3 rounded-xl bg-sand/30 hover:bg-sand/60 border border-sand text-xs font-bold text-charcoal transition-all flex items-center justify-center gap-1.5"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-terracotta" />
                    <span>Or Click for Virtual Scan</span>
                  </button>
                  <a
                    href={resolvedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-paper hover:bg-clay-muted border border-border text-xs font-semibold text-charcoal transition-all flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-secondary" />
                    <span>Open in New Browser Tab</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Instructions & Quick Preview */}
              <div className="md:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl bg-sand/15 border border-sand/40 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-charcoal">
                    <Sparkles className="w-4 h-4 text-terracotta" />
                    <span>How to Scan with Your Phone:</span>
                  </div>
                  <ol className="text-xs text-secondary space-y-1.5 list-decimal list-inside leading-relaxed">
                    <li>
                      Make sure your phone is connected to the <strong>same Wi-Fi network</strong> (or mobile hotspot) as this computer.
                    </li>
                    <li>
                      Open your smartphone's camera or QR code scanner and point it at the code on the left.
                    </li>
                    <li>
                      Tap the URL preview <code className="bg-paper px-1.5 py-0.5 rounded border border-sand/50 text-terracotta font-mono font-bold text-[11px]">{lanIp}:3000</code> to view the full tamper-proof digital passport!
                    </li>
                  </ol>
                </div>

                {/* Quick Summary Highlights */}
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-paper border border-border space-y-1">
                    <span className="text-[10px] uppercase font-bold text-secondary flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-terracotta" />
                      Who Made It:
                    </span>
                    <p className="text-xs font-bold text-charcoal">
                      {passport?.artisanDetails?.name || 'Master Artisan'}
                    </p>
                    <p className="text-[11px] text-secondary">
                      {passport?.artisanDetails?.community} • {passport?.artisanDetails?.region}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-paper border border-border space-y-1">
                    <span className="text-[10px] uppercase font-bold text-forest flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      Which RangMitti Mineral Is Used:
                    </span>
                    <p className="text-xs font-bold text-charcoal">
                      {passport?.geologicalOrigin?.mineralStream}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-secondary">
                      <span className="font-mono">Batch: {passport?.materialBatch?.batchNumber}</span>
                      <span className="text-forest font-semibold">✓ TCLP Leaching: Pass</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-paper border border-border space-y-1">
                    <span className="text-[10px] uppercase font-bold text-secondary flex items-center gap-1">
                      <Clock className="w-3 h-3 text-terracotta" />
                      Creation Date & Process:
                    </span>
                    <p className="text-xs text-charcoal">
                      Issued: <strong className="font-mono">{passport?.issueDate}</strong> ({passport?.journeySteps?.length || 8} Stages Verified)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* VIRTUAL SCAN VIEW */
            <div className="space-y-6">
              {scanStep === 'scanning' ? (
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="relative w-44 h-44 rounded-2xl border-2 border-dashed border-terracotta flex items-center justify-center bg-ivory-warm">
                    <QrCode className="w-20 h-20 text-terracotta animate-pulse" />
                    {/* Simulated Laser Scanner */}
                    <div className="absolute inset-x-2 top-1/2 h-1 bg-terracotta rounded shadow-[0_0_12px_#A85E3B] animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-charcoal">
                      Scanning Virtual Medallion...
                    </h3>
                    <p className="text-xs text-secondary">
                      Resolving RangMitti Digital Provenance Ledger for <span className="font-mono font-bold text-terracotta">{finalPassportId}</span>
                    </p>
                  </div>
                </div>
              ) : (
                /* RESOLVED PASSPORT DETAILS (All 4 Required Sections) */
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Verified Header Pill */}
                  <div className="p-3.5 rounded-2xl bg-forest/15 border border-forest/30 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-forest font-bold text-xs sm:text-sm">
                      <ShieldCheck className="w-5 h-5 shrink-0" />
                      <span>Cryptographic Provenance Verified: {finalPassportId}</span>
                    </div>
                    <button
                      onClick={() => setScanStep('scanning')}
                      className="text-xs text-forest hover:underline flex items-center gap-1 font-semibold"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Re-scan</span>
                    </button>
                  </div>

                  {/* 4 CARDS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* CARD 1: WHO MADE IT */}
                    <div className="p-4 rounded-2xl bg-ivory-warm border border-sand/60 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase text-terracotta">
                        <UserCheck className="w-4 h-4" />
                        <span>1. Who Made It (Master Creator)</span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-charcoal">
                        {passport?.artisanDetails?.name || 'Master Artisan'}
                      </h4>
                      <p className="text-xs text-secondary">
                        <strong>Lineage:</strong> {passport?.artisanDetails?.community || 'Tribal Craft Tradition'}
                      </p>
                      <p className="text-xs text-secondary flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-terracotta" />
                        <span>{passport?.artisanDetails?.region || 'West Singhbhum, Jharkhand'}</span>
                      </p>
                      <div className="pt-2 border-t border-border/60 text-[11px] text-forest font-medium">
                        ✓ 70–80% direct remuneration guaranteed to creator under Fair Craft Protocol.
                      </div>
                    </div>

                    {/* CARD 2: WHICH RANGMITTI IS USED */}
                    <div className="p-4 rounded-2xl bg-ivory-warm border border-sand/60 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase text-forest">
                        <Layers className="w-4 h-4" />
                        <span>2. Which RangMitti Was Used</span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-charcoal">
                        {passport?.geologicalOrigin?.mineralStream || 'Mineral Valorization By-Product'}
                      </h4>
                      <p className="text-xs text-secondary font-mono">
                        <strong>Batch ID:</strong> {passport?.materialBatch?.batchNumber}
                      </p>
                      <p className="text-xs text-secondary">
                        <strong>Mine/Depot:</strong> {passport?.geologicalOrigin?.mineOrSite}
                      </p>
                      <p className="text-[11px] font-mono text-terracotta">
                        Geo: {passport?.geologicalOrigin?.coordinates}
                      </p>
                      <div className="pt-2 border-t border-border/60 text-[11px] text-forest font-medium">
                        ✓ EPA 1311 TCLP Heavy Metals Leaching: Pass (&lt;0.01 mg/L)
                      </div>
                    </div>

                    {/* CARD 3: PRODUCT DETAILS & SPECS */}
                    <div className="p-4 rounded-2xl bg-ivory-warm border border-sand/60 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase text-charcoal">
                        <Sparkles className="w-4 h-4 text-terracotta" />
                        <span>3. Product Specifications</span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-charcoal">
                        {passport?.productName}
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs text-secondary">
                        <div>
                          <strong>Type:</strong> {passport?.productType === 'artwork' ? 'Original Artwork' : 'Raw Mineral'}
                        </div>
                        <div>
                          <strong>Status:</strong> {passport?.status}
                        </div>
                      </div>
                      <p className="text-xs text-secondary leading-relaxed pt-1">
                        Formulated exclusively with non-toxic earth minerals, purified local clays, and natural tree-gum binders.
                      </p>
                    </div>

                    {/* CARD 4: WHEN MADE & TIMELINE */}
                    <div className="p-4 rounded-2xl bg-ivory-warm border border-sand/60 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase text-secondary">
                        <Calendar className="w-4 h-4 text-terracotta" />
                        <span>4. When It Was Made</span>
                      </div>
                      <div className="text-xs text-secondary">
                        <p><strong>Passport Issue Date:</strong> <span className="font-mono">{passport?.issueDate}</span></p>
                        <p><strong>Last Ledger Verification:</strong> <span className="font-mono">{passport?.lastUpdated}</span></p>
                      </div>
                      <div className="p-2 rounded bg-paper border border-border text-[11px] text-charcoal font-mono">
                        Token: {passport?.verificationToken}
                      </div>
                    </div>
                  </div>

                  {/* 8-STEP LIFECYCLE JOURNEY */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-paper border border-border space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border">
                      <h4 className="font-serif text-sm sm:text-base font-bold text-charcoal flex items-center gap-2">
                        <Clock className="w-4 h-4 text-terracotta" />
                        <span>Complete 8-Stage Valorization Process:</span>
                      </h4>
                      <span className="text-[11px] font-mono text-forest font-bold">8 / 8 VERIFIED</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                      {(passport?.journeySteps || []).map((step) => (
                        <div
                          key={step.stepNumber}
                          className="p-2.5 rounded-xl bg-ivory-warm border border-border text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-terracotta text-[11px]">
                              Step {step.stepNumber}
                            </span>
                            <span className="text-forest text-[11px] font-bold">✓ Verified</span>
                          </div>
                          <p className="font-semibold text-charcoal leading-tight">
                            {step.title}
                          </p>
                          <p className="text-[11px] text-secondary line-clamp-2">
                            {step.description}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-secondary/80 pt-1 font-mono">
                            <span>{step.date}</span>
                            <span className="truncate max-w-[120px]">{step.location.split(',')[0]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-ivory-warm border-t border-border flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/passport/${finalPassportId}`}
            className="py-2.5 px-4 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <span>Open Full Provenance Certificate</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-paper hover:bg-clay-muted border border-border text-xs font-semibold text-charcoal transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
