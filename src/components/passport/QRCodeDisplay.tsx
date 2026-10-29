'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { findPassport } from '@/data/passports';
import { 
  Smartphone, 
  Wifi, 
  ExternalLink, 
  Copy, 
  Check, 
  HelpCircle, 
  X, 
  ShieldCheck, 
  QrCode,
  Sparkles,
  RefreshCw,
  Layers,
  MapPin,
  Calendar,
  UserCheck
} from 'lucide-react';

interface QRCodeDisplayProps {
  url?: string;
  passportId?: string;
  size?: number;
  className?: string;
  showDownload?: boolean;
}

export default function QRCodeDisplay({
  url: initialUrl,
  passportId = 'RM-001-ART-007',
  size = 180,
  className = '',
  showDownload = false,
}: QRCodeDisplayProps) {
  const [targetMode, setTargetMode] = useState<'lan' | 'local' | 'custom'>('lan');
  const [lanIp, setLanIp] = useState<string>('10.73.68.75');
  const [customHost, setCustomHost] = useState<string>('');
  const [resolvedUrl, setResolvedUrl] = useState<string>(initialUrl || '');
  const [dataUrl, setDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showSimModal, setShowSimModal] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<'scanning' | 'resolved'>('scanning');

  const passportData = findPassport(passportId);

  // Fetch detected server IP on mount
  useEffect(() => {
    fetch('/api/network-info')
      .then((res) => res.json())
      .then((data) => {
        if (data.primaryIp) {
          setLanIp(data.primaryIp);
        }
      })
      .catch(() => {
        // Fallback to known IP
        setLanIp('10.73.68.75');
      });
  }, []);

  // Compute the active target URL based on mode
  useEffect(() => {
    let finalUrl = '';
    const cleanPath = `/passport/${passportId}`;

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
    } else if (initialUrl) {
      finalUrl = initialUrl;
    } else {
      finalUrl = `http://${lanIp}:3000${cleanPath}`;
    }

    setResolvedUrl(finalUrl);

    // Generate QR Data URL
    QRCode.toDataURL(
      finalUrl,
      {
        width: size * 2,
        margin: 1,
        color: {
          dark: '#282923',
          light: '#FFFEFB',
        },
      },
      (err, src) => {
        if (!err && src) {
          setDataUrl(src);
        }
      }
    );
  }, [targetMode, lanIp, customHost, passportId, initialUrl, size]);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(resolvedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `rangmitti-passport-${passportId}.png`;
    a.click();
  };

  const openSimulateModal = () => {
    setScanStep('scanning');
    setShowSimModal(true);
    setTimeout(() => {
      setScanStep('resolved');
    }, 1200);
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Network Selector Pill */}
      <div className="flex items-center space-x-1 p-1 rounded-lg bg-ivory-warm border border-border mb-2.5 text-[10px] font-semibold">
        <button
          onClick={() => setTargetMode('lan')}
          className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
            targetMode === 'lan' ? 'bg-terracotta text-paper' : 'text-secondary hover:text-charcoal'
          }`}
          title={`Encode Wi-Fi LAN IP (${lanIp}:3000) for mobile scanning`}
        >
          <Wifi className="w-2.5 h-2.5" />
          <span>Mobile Wi-Fi</span>
        </button>
        <button
          onClick={() => setTargetMode('local')}
          className={`px-2 py-0.5 rounded transition-colors ${
            targetMode === 'local' ? 'bg-terracotta text-paper' : 'text-secondary hover:text-charcoal'
          }`}
          title="Encode localhost:3000 for local browser testing"
        >
          Localhost
        </button>
        <button
          onClick={() => setTargetMode('custom')}
          className={`px-2 py-0.5 rounded transition-colors ${
            targetMode === 'custom' ? 'bg-terracotta text-paper' : 'text-secondary hover:text-charcoal'
          }`}
          title="Enter custom public tunnel (ngrok / Cloudflare)"
        >
          Custom Tunnel
        </button>
      </div>

      {/* Custom Host Input (if mode is custom) */}
      {targetMode === 'custom' && (
        <div className="mb-2 w-full max-w-[220px]">
          <input
            type="text"
            value={customHost}
            onChange={(e) => setCustomHost(e.target.value)}
            placeholder="e.g. https://my-tunnel.ngrok-free.app"
            className="w-full px-2 py-1 text-[10px] rounded border border-border bg-paper text-charcoal focus:outline-none focus:border-terracotta"
          />
        </div>
      )}

      {/* QR Box */}
      <div className="relative p-2.5 rounded-xl bg-paper border border-border shadow-md group">
        {dataUrl ? (
          <img
            src={dataUrl}
            alt={`QR Code for ${resolvedUrl}`}
            width={size}
            height={size}
            className="rounded-lg object-contain"
          />
        ) : (
          <div
            style={{ width: size, height: size }}
            className="flex items-center justify-center bg-ivory-warm text-secondary text-xs rounded-lg animate-pulse"
          >
            Generating QR...
          </div>
        )}
      </div>

      {/* Target URL indicator & Copy */}
      <div className="mt-2 flex items-center space-x-1.5 text-[10px] text-secondary max-w-[220px]">
        <span className="truncate font-mono" title={resolvedUrl}>
          {resolvedUrl.replace(/^https?:\/\//, '')}
        </span>
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-clay-muted text-charcoal shrink-0"
          title="Copy URL"
        >
          {copied ? <Check className="w-3 h-3 text-forest" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>

      {/* Action Buttons: Simulate Phone Scan & Download */}
      <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={openSimulateModal}
          className="px-2.5 py-1 rounded-lg bg-sand/30 hover:bg-sand/60 border border-sand text-[10px] font-bold text-charcoal transition-all flex items-center gap-1 shadow-sm"
        >
          <Smartphone className="w-3 h-3 text-terracotta" />
          <span>Simulate Phone Scan</span>
        </button>

        <a
          href={resolvedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1 rounded-lg bg-ivory-warm hover:bg-clay-muted border border-border text-[10px] font-semibold text-charcoal transition-all flex items-center gap-1"
        >
          <ExternalLink className="w-3 h-3 text-secondary" />
          <span>Open Link</span>
        </a>

        {showDownload && dataUrl && (
          <button
            onClick={handleDownload}
            className="text-[10px] font-semibold text-terracotta hover:underline"
          >
            Save QR PNG ↓
          </button>
        )}
      </div>

      {/* Help Explainer Toggle */}
      <button
        onClick={() => setShowHelp(!showHelp)}
        className="mt-1.5 text-[10px] text-secondary hover:text-terracotta flex items-center gap-1 underline"
      >
        <HelpCircle className="w-3 h-3" />
        <span>Phone scanning instructions</span>
      </button>

      {/* Inline Help Box */}
      {showHelp && (
        <div className="mt-2 p-2.5 rounded-xl bg-ivory-warm border border-sand/60 text-[10px] text-secondary text-left space-y-1.5 max-w-[260px] animate-in fade-in">
          <p className="font-bold text-charcoal">Why didn't scanning work?</p>
          <p>
            1. <strong>Localhost is not on your phone:</strong> If the QR code contains "localhost", your phone looks at itself instead of your computer.
          </p>
          <p>
            2. <strong>Connect to Same Wi-Fi:</strong> Switch to <strong>"Mobile Wi-Fi"</strong> above. Ensure your phone is connected to the same Wi-Fi as this PC (IP: <code className="font-mono text-terracotta">{lanIp}:3000</code>).
          </p>
          <p>
            3. <strong>Instant Alternative:</strong> Click <strong>"Simulate Phone Scan"</strong> above to showcase the exact mobile scan experience live on screen!
          </p>
        </div>
      )}

      {/* Simulate Phone Scan Modal (Interactive Presentation Feature) */}
      {showSimModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-charcoal rounded-[40px] p-4 shadow-2xl border-4 border-charcoal-soft text-paper flex flex-col items-center">
            {/* Top Phone Speaker Bar */}
            <div className="w-24 h-4 bg-charcoal-soft rounded-full mb-3 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-charcoal" />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowSimModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-paper/20 hover:bg-paper/40 text-paper"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Phone Screen Viewport */}
            <div className="w-full h-[520px] rounded-[28px] bg-ivory-warm text-charcoal overflow-y-auto p-4 flex flex-col justify-between shadow-inner">
              {scanStep === 'scanning' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="relative w-44 h-44 rounded-2xl border-2 border-dashed border-terracotta flex items-center justify-center bg-paper/50">
                    <QrCode className="w-16 h-16 text-terracotta animate-pulse" />
                    {/* Laser Scanner Line */}
                    <div className="absolute inset-x-2 top-1/2 h-0.5 bg-terracotta shadow-[0_0_8px_#A85E3B] animate-bounce" />
                  </div>
                  <div>
                    <p className="font-serif text-sm font-bold text-charcoal">
                      Scanning Medallion QR Seal...
                    </p>
                    <p className="text-[10px] text-secondary">
                      Resolving RangMitti Digital Provenance Ledger
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {/* Verified Header */}
                  <div className="p-3 rounded-xl bg-forest/15 border border-forest/30 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1.5 text-forest font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authentic RangMitti Passport</span>
                    </div>
                    <span className="font-mono text-[9px] bg-forest text-paper px-1.5 py-0.5 rounded font-bold">
                      VERIFIED
                    </span>
                  </div>

                  {/* Product Card */}
                  <div className="p-3 rounded-xl bg-paper border border-border shadow-sm space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[10px] text-terracotta font-bold">
                        ID: {passportData?.passportId || passportId}
                      </p>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-sand/30 text-charcoal">
                        {passportData?.productType || 'Handcrafted'}
                      </span>
                    </div>

                    <h4 className="font-serif text-sm font-bold text-charcoal leading-tight">
                      {passportData?.productName || 'Verified RangMitti Creation'}
                    </h4>

                    {/* Who Made It */}
                    <div className="p-2 rounded-lg bg-ivory-warm border border-sand/40 space-y-1">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-charcoal">
                        <UserCheck className="w-3 h-3 text-terracotta" />
                        <span>Who Made It:</span>
                      </div>
                      <p className="text-[11px] text-charcoal font-semibold">
                        {passportData?.artisanDetails?.name || 'Master Artisan'}
                      </p>
                      <p className="text-[10px] text-secondary">
                        {passportData?.artisanDetails?.community || 'Tribal Craft Tradition'} • {passportData?.artisanDetails?.region || 'Jharkhand'}
                      </p>
                    </div>

                    {/* Which RangMitti is used */}
                    <div className="p-2 rounded-lg bg-forest/10 border border-forest/30 space-y-1">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-forest">
                        <Layers className="w-3 h-3" />
                        <span>RangMitti Mineral Stream & Safety:</span>
                      </div>
                      <p className="text-[11px] font-semibold text-charcoal">
                        {passportData?.geologicalOrigin?.mineralStream || 'Mineral Valorization By-Product'}
                      </p>
                      <p className="text-[10px] text-secondary font-mono">
                        Batch: {passportData?.materialBatch?.batchNumber || 'BATCH-2026-VAL'}
                      </p>
                      <p className="text-[10px] text-forest font-bold">
                        ✓ Heavy Metals TCLP: Pass (&lt;0.01 mg/L)
                      </p>
                    </div>

                    {/* Geological Origin Node */}
                    <div className="p-2 rounded-lg bg-ivory-warm border border-border text-[10px] space-y-0.5">
                      <div className="flex items-center gap-1 font-bold text-charcoal">
                        <MapPin className="w-3 h-3 text-terracotta" />
                        <span>Geological Mine Origin:</span>
                      </div>
                      <p className="text-secondary">{passportData?.geologicalOrigin?.mineOrSite}</p>
                      <p className="font-mono text-terracotta font-bold text-[9px]">{passportData?.geologicalOrigin?.coordinates}</p>
                    </div>

                    {/* When it was made & process steps */}
                    <div className="p-2 rounded-lg bg-paper border border-border text-[10px] space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-charcoal">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-terracotta" />
                          <span>Creation Date:</span>
                        </span>
                        <span className="font-mono text-secondary">{passportData?.issueDate || '2026-02-20'}</span>
                      </div>

                      <div className="pt-1 border-t border-border/60">
                        <span className="text-[9px] font-bold text-secondary uppercase block mb-1">
                          Complete 8-Step Lifecycle Journey:
                        </span>
                        <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                          {(passportData?.journeySteps || []).map((step) => (
                            <div key={step.stepNumber} className="flex items-start gap-1 text-[9px]">
                              <span className="font-mono font-bold text-terracotta">{step.stepNumber}.</span>
                              <span className="font-semibold text-charcoal">{step.title}</span>
                              <span className="text-forest ml-auto">✓</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions inside Phone */}
                  <div className="space-y-2 pt-1">
                    <a
                      href={`/passport/${passportData?.passportId || passportId}`}
                      className="w-full py-2.5 px-3 rounded-xl bg-terracotta text-paper text-xs font-semibold text-center block shadow"
                    >
                      Open Full Certificate Ledger →
                    </a>
                    <button
                      onClick={() => setScanStep('scanning')}
                      className="w-full text-center text-[10px] text-secondary hover:text-charcoal flex items-center justify-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Re-scan simulation
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Phone Indicator */}
              <div className="pt-2 text-center text-[9px] text-secondary border-t border-border/60">
                Idea Tribe 2026 Mobile Provenance Reader
              </div>
            </div>

            {/* Bottom Phone Bar */}
            <div className="w-32 h-1 bg-charcoal-soft rounded-full mt-3" />
          </div>
        </div>
      )}
    </div>
  );
}
