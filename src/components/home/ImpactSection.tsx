'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Recycle, 
  Coins, 
  Eye, 
  Users2, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function ImpactSection() {
  const impactAreas = [
    {
      title: 'Responsible Material Valorization',
      icon: Recycle,
      description: 'Systematic characterization and safe repurposing of selected mineral beneficiation streams that would otherwise accumulate in settling ponds, reducing unmanaged tailings accumulation in Jharkhand mining corridors.',
      status: 'Pilot Methodology Validated',
    },
    {
      title: 'Direct Creative & Economic Opportunities',
      icon: Coins,
      description: 'Establishing transparent, equitable revenue-sharing models that ensure tribal creators receive the majority of market value, moving beyond exploitative middlemen in traditional handicraft trade.',
      status: 'Fair-Trade Framework Formulated',
    },
    {
      title: 'Artisan Visibility & Living Heritage',
      icon: Eye,
      description: 'Preserving endangered tribal artforms—including Sohrai, Khovar, Jadopatia, and Dokra—by celebrating named artisans and linking digital provenance to their clans and cultural homelands.',
      status: 'Provenance Ledger Implemented',
    },
    {
      title: 'Cooperatives & Women-Led Clusters',
      icon: Users2,
      description: 'Building organized self-help groups and artisanal cooperatives across West Singhbhum, providing shared beneficiation milling infrastructure and non-toxic working conditions.',
      status: 'Community Co-Design in Progress',
    },
  ];

  return (
    <section className="py-20 bg-ivory-warm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-terracotta">
            Our Purpose & Impact Framework
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Intended Impact Areas
          </h2>
          <p className="text-sm sm:text-base text-secondary leading-relaxed">
            RangMitti is built on transparent, measurable intentions. Because this platform is in its pilot demonstration phase, we present verified scientific methods and ethical commitments rather than unverified commercial claims.
          </p>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactAreas.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-paper border border-border flex flex-col justify-between hover:border-sand hover:shadow-lg transition-all"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-charcoal">
                    {item.title}
                  </h3>

                  <p className="text-xs text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-border/70 mt-6 flex items-center space-x-1.5 text-[11px] font-semibold text-forest">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Academic Integrity Note */}
        <div className="mt-12 p-4 rounded-xl bg-paper/80 border border-sand/60 text-xs text-secondary flex items-start space-x-3 max-w-3xl mx-auto">
          <ShieldAlert className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-charcoal font-semibold">Competition Disclosure (Idea Tribe 2026):</strong> Sourcing channels, lab characterization parameters, and socio-economic outcomes are proposed by the student research team and undergo active pilot verification. We never publish simulated or fabricated revenue, employment quotas, or unaccredited certifications.
          </p>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/impact"
            className="inline-flex items-center text-xs font-semibold text-terracotta hover:underline"
          >
            <span>Read Full Pilot Impact & Environmental Verification Methodology</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
