'use client';

import React from 'react';
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
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function HowItWorksPage() {
  const fullSteps = [
    {
      num: '01',
      title: 'Material Sourcing',
      subtitle: 'Targeted Stream Identification & Auditing',
      icon: Pickaxe,
      details: 'We identify suitable mineral streams from iron ore beneficiation slimes in West Singhbhum, secondary copper flotation tailings in Ghatsila, and primary kaolin clay washings along the Subarnarekha river basin. Only non-radioactive, chemically stable sedimentary fractions are sampled.',
      techSpec: 'GPS location logging, sample stratification, and mineral phase baseline mapping.',
    },
    {
      num: '02',
      title: 'Laboratory Testing & Safety Screening',
      subtitle: 'EPA 1311 TCLP & Elemental Assay',
      icon: FlaskConical,
      details: 'Every candidate mineral batch is subjected to EPA 1311 Toxicity Characteristic Leaching Procedure (TCLP). Bio-leachable Lead (Pb), Cadmium (Cd), Arsenic (As), and Chromium (Cr) must remain below detectable analytical limits (<0.01 mg/L). Lots exceeding safety thresholds are immediately rejected.',
      techSpec: 'ASTM D4303 lightfastness assay (QUV 1000h accelerated weathering) and pH neutrality test.',
    },
    {
      num: '03',
      title: 'Controlled Beneficiation',
      subtitle: 'Milling, Desliming & Size Grading',
      icon: Cog,
      details: 'Approved mineral streams undergo planetary wet ball-milling to achieve narrow particle size distributions (<20 microns). Magnetic separators remove coarse silica quartz grit, which is diverted to fine structural texture aggregate.',
      techSpec: 'Laser diffraction particle analysis (D50 < 12 microns) and solar desiccator roasting.',
    },
    {
      num: '04',
      title: 'Creative Material Standardization',
      subtitle: 'Formulation into Archival Media',
      icon: Palette,
      details: 'Refined mineral powders are standardized into three distinct media formats: raw pigment powder jars, pre-dispersed ceramic wash slurries, and archival tempera bases formulated with natural Acacia Senegal (Babul gum) binders.',
      techSpec: 'Zero flocculation, non-cracking opacity, and high tinting strength benchmarked.',
    },
    {
      num: '05',
      title: 'Artisan Collaboration & Co-Design',
      subtitle: 'Equitable Community Distribution',
      icon: Users,
      details: 'Standardized pigments are delivered to tribal artisan studios across Saranda, Khunti, and Jhinkpani. Traditional muralists, Dokra brass casters, and potters test handling and brush-feel under fair-trade co-design contracts.',
      techSpec: 'Fair remuneration baseline: creators receive the lion\'s share of final product value.',
    },
    {
      num: '06',
      title: 'Artisan Product Creation',
      subtitle: 'Ancestral Technique Meets Mineral Pigments',
      icon: Sparkles,
      details: 'Artisans hand-paint Sohrai harvest murals on woven khadi canvas, carve Khovar comb-relief bridal panels, cast Dokra lost-wax bronze sculptures with verdigris mineral dust, and throw terra sigillata vessels.',
      techSpec: 'Each artifact is completely unique, handcrafted with ancestral tribal motifs.',
    },
    {
      num: '07',
      title: 'Digital Passport Generation',
      subtitle: 'Permanent Cryptographic Ledger Seal',
      icon: QrCode,
      details: 'Upon inspection, each completed artifact is issued a unique RangMitti Passport. The ledger binds the physical item to its geological source, lab batch certificate, artisan identity, and creation timeline with a permanent tamper-evident QR code medallion.',
      techSpec: 'Cryptographic SHA-256 token representation and print-ready archival PDF certificate.',
    },
    {
      num: '08',
      title: 'Customer Delivery & Provenance Proof',
      subtitle: 'Conscious Collector Connection',
      icon: ShoppingBag,
      details: 'Customers, interior architects, and institutional collectors receive museum-grade creations in acid-free recyclable packaging. Scanning the QR code with any smartphone reveals the complete transparent journey of the earth and the artist.',
      techSpec: 'Nationwide tracked shipping with full transit guarantee and provenance deed.',
    },
  ];

  return (
    <div className="bg-ivory-warm min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The 8-Stage Value Chain</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal leading-tight">
            How RangMitti Works: From Mine Stream to Collector
          </h1>

          <p className="text-sm sm:text-base text-secondary leading-relaxed">
            Our comprehensive process ensures that mineral valorization is scientifically verified, culturally respectful, and economically empowering for tribal communities.
          </p>
        </div>

        {/* 8 Stages Detailed Timeline */}
        <div className="space-y-8">
          {fullSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-8 rounded-3xl bg-paper border border-border shadow-sm flex flex-col md:flex-row gap-6 items-start hover:border-sand transition-all"
              >
                <div className="flex items-center space-x-4 shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta font-serif font-bold text-xl">
                    {step.num}
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta">
                      {step.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-charcoal">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    {step.details}
                  </p>

                  <div className="p-3 rounded-xl bg-ivory-warm border border-border text-xs text-charcoal flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                    <span><strong>Technical Benchmark:</strong> {step.techSpec}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-3xl bg-paper border border-sand text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-charcoal">
            Inspect a Real Digital Passport
          </h3>
          <p className="text-xs text-secondary max-w-md mx-auto">
            Experience the live implementation of our digital provenance ledger right now on the running platform.
          </p>
          <div className="pt-2">
            <Link
              href="/passport/RM-001-ART-007"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold shadow-md transition-all gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              <span>Explore Sample Passport (RM-001-ART-007)</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
