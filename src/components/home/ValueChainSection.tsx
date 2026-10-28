'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Pickaxe, 
  FlaskConical, 
  Cog, 
  Palette, 
  Users, 
  Sparkles, 
  QrCode, 
  ShoppingBag,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function ValueChainSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Source',
      subtitle: 'Responsible Material Identification',
      icon: Pickaxe,
      shortDesc: 'Identify suitable mineral streams from iron ore slimes, kaolin washing deposits, and flotation tailings.',
      detail: 'Working under pilot sampling protocols in West Singhbhum and East Singhbhum, we audit settling ponds and mineral washing circuits. Only mineral streams that meet consistency and safety criteria are collected.',
      location: 'Chiriya, Ghatsila & Subarnarekha Basin, Jharkhand',
      verification: 'Geological site GPS logged & mineralogical baseline surveyed.',
    },
    {
      step: '02',
      title: 'Test',
      subtitle: 'Rigorous Safety & Characterization',
      icon: FlaskConical,
      shortDesc: 'Laboratory testing for toxic heavy metals leachability (TCLP), lightfastness, and crystal phase XRD.',
      detail: 'Every lot undergoes EPA 1311 Toxicity Characteristic Leaching Procedure (TCLP) to ensure bio-leachable Lead, Cadmium, Arsenic, and Chromium remain strictly below threshold. Materials that fail are rejected immediately.',
      location: 'Characterization Reference Lab (Pilot Protocol)',
      verification: 'Independent batch test certificate logged on passport registry.',
    },
    {
      step: '03',
      title: 'Process',
      subtitle: 'Controlled Beneficiation',
      icon: Cog,
      shortDesc: 'Wet ball-milling, magnetic separation, hydraulic classification, and solar desiccator roasting.',
      detail: 'Mineral fractions are refined to uniform particle size distributions (<20 microns). Non-pigment abrasive quartz fractions are separated and repurposed as fine texture aggregates.',
      location: 'Singhbhum Valorization Cluster Facility, Chaibasa',
      verification: 'Grain size laser diffraction curve verified & batch coded.',
    },
    {
      step: '04',
      title: 'Develop Creative Material',
      subtitle: 'Formulation & Standardization',
      icon: Palette,
      shortDesc: 'Stabilize powders into archival artist pigments, gouache bases, and ceramic wash slurries.',
      detail: 'Formulations are tested with natural binders including Acacia Senegal (Babul gum), tamarind seed gum, and archival acrylic emulsions to assure zero curdling, flocculation, or color shift.',
      location: 'RangMitti Creative Material Lab',
      verification: 'pH neutrality, tinting strength, and viscosity validated.',
    },
    {
      step: '05',
      title: 'Collaborate with Artisans',
      subtitle: 'Community Partnership & Co-Design',
      icon: Users,
      shortDesc: 'Distribute validated materials to indigenous master artists and women-led cooperative studios.',
      detail: 'Artisans evaluate pigment handling, opacity, and brush feel. Traditional muralists, Dokra casters, and potters receive standardized pigments at subsidized pilot rates alongside fair trade agreements.',
      location: 'Saranda, Khunti & Jhinkpani Artisan Workshops',
      verification: 'Artisan consent and authorship contract logged.',
    },
    {
      step: '06',
      title: 'Create Products',
      subtitle: 'Artisan Craftsmanship',
      icon: Sparkles,
      shortDesc: 'Artisans handcraft Sohrai paintings, Khovar relief panels, Dokra bronzes, and stoneware pottery.',
      detail: 'Every piece is crafted entirely by hand using ancestral techniques passed down across generations. The unique mineral pigments impart earthy depth impossible to replicate with petrochemical synthetic paints.',
      location: 'Artisan Studios, Jharkhand',
      verification: 'Individual craft inspection and master artisan signature recorded.',
    },
    {
      step: '07',
      title: 'Generate Digital Passport',
      subtitle: 'Cryptographic Provenance QR Seal',
      icon: QrCode,
      shortDesc: 'Generate a unique digital passport linking product ID, material batch, lab tests, and artisan story.',
      detail: 'A tamper-resistant physical QR seal is affixed to the product packaging. Scanning the QR code instantly opens the public passport ledger with full supply-chain transparency and lab certificates.',
      location: 'RangMitti Digital Registry',
      verification: 'Unique Passport ID issued with cryptographic hash.',
    },
    {
      step: '08',
      title: 'Connect with Customers',
      subtitle: 'Ethical Marketplace Delivery',
      icon: ShoppingBag,
      shortDesc: 'Deliver artworks and materials directly to collectors, architects, and design studios nationwide.',
      detail: 'Customers receive museum-grade creations with complete transparent origin stories. Substantial economic returns flow directly back to tribal creators and mineral valorization cooperatives.',
      location: 'Pan-India Delivery Hubs',
      verification: 'Customer delivery confirmed with digital ownership deed.',
    },
  ];

  return (
    <section className="py-20 bg-ivory-warm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-terracotta">
            The Integrated Material-to-Market Ecosystem
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            How RangMitti Works
          </h2>
          <p className="text-sm sm:text-base text-secondary leading-relaxed">
            Our 8-stage value chain transforms mineral by-products into standardized creative materials, connects them with indigenous artisans, and safeguards provenance through digital passports.
          </p>
        </div>

        {/* Step Numbers Nav (Horizontal Scrollable Grid) */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isSelected = activeStep === index;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(index)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-terracotta text-paper border-terracotta shadow-md scale-105'
                    : 'bg-paper text-charcoal border-border hover:border-terracotta/50 hover:bg-clay-muted/40'
                }`}
              >
                <span className={`block font-serif text-xs font-bold ${isSelected ? 'text-sand' : 'text-secondary'}`}>
                  {item.step}
                </span>
                <p className="text-[11px] font-semibold mt-1 truncate">
                  {item.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Card */}
        <div className="rounded-2xl bg-paper border border-border p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left detail */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-full bg-sand/30 text-charcoal font-serif font-bold text-sm">
                  Stage {steps[activeStep].step}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
                  {steps[activeStep].subtitle}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                {steps[activeStep].title}
              </h3>

              <p className="text-sm sm:text-base text-secondary leading-relaxed">
                {steps[activeStep].detail}
              </p>

              <div className="space-y-2 pt-2 border-t border-border text-xs">
                <div className="flex items-start space-x-2">
                  <span className="font-semibold text-charcoal min-w-[120px]">Geographic Node:</span>
                  <span className="text-secondary">{steps[activeStep].location}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold text-charcoal min-w-[120px]">Verification Gate:</span>
                  <span className="text-forest font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0" />
                    {steps[activeStep].verification}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive Highlights */}
            <div className="lg:col-span-5 bg-ivory-warm rounded-xl p-6 border border-border space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-bold text-charcoal">Value Chain Progress</span>
                <span className="text-xs text-secondary font-mono">{activeStep + 1} of 8</span>
              </div>

              <div className="space-y-3 text-xs">
                {steps.map((st, idx) => (
                  <div
                    key={st.step}
                    onClick={() => setActiveStep(idx)}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                      idx === activeStep
                        ? 'bg-clay-muted text-charcoal font-semibold'
                        : 'text-secondary hover:text-charcoal'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] w-5 text-terracotta">{st.step}</span>
                      <span>{st.title}</span>
                    </div>
                    {idx < activeStep ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                    ) : idx === activeStep ? (
                      <span className="w-2 h-2 rounded-full bg-terracotta" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary/30" />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/how-it-works"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg bg-charcoal hover:bg-charcoal-soft text-paper text-xs font-semibold transition-colors"
                >
                  Read Full Scientific Protocol & Journey
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
