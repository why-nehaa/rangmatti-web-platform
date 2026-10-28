'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Recycle, 
  Coins, 
  Eye, 
  Users2, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles,
  ArrowRight 
} from 'lucide-react';

export default function ImpactFrameworkPage() {
  const pillars = [
    {
      title: 'Responsible Valorization of Mineral Streams',
      icon: Recycle,
      description: 'Millions of tonnes of iron ore beneficiation slimes and flotation tailings sit in settling basins across West Singhbhum. By repurposing high-purity ferric and silicate fractions into archival creative media, we establish a circular materials benchmark that diverts industrial by-products into non-destructive creative assets.',
      targets: [
        'Pilot collection of 25 tonnes of beneficiation slimes from Saranda settling sectors',
        'Standardization of 4 primary color spectrums (Terracotta Ochre, Verdigris, Kaolin White, Specularite Grey)',
        'Zero-effluent wet classification pilot powered by solar desiccators',
      ],
    },
    {
      title: 'Dignified Artisan Economic Livelihoods',
      icon: Coins,
      description: 'Traditional handicraft trade in eastern India has long been hampered by multi-tiered intermediary networks. RangMitti establishes a transparent digital model where up to 80% of retail sales value is transferred directly to tribal artisans.',
      targets: [
        'Direct digital settlement via verified bank accounts / SHG federation accounts',
        'Transparent cost breakdown displayed on digital passports',
        'Guaranteed minimum base purchase rate for commissioned collection items',
      ],
    },
    {
      title: 'Preservation & Visibility of Living Tribal Art',
      icon: Eye,
      description: 'Sohrai winter harvest murals and Khovar bridal comb-cut art carry profound philosophical bonds with ecology. Our digital passports record the clan, tradition, and mythological stories of each artisan, preventing cultural appropriation and commercial erasure.',
      targets: [
        'Permanent public archiving of tribal creation lore on the passport ledger',
        'Full consent contracts granting artisans permanent digital attribution',
        'Documentation of vanishing comb-carving and lost-wax casting techniques',
      ],
    },
    {
      title: 'Cooperative Governance & Women-Led Self-Help Groups',
      icon: Users2,
      description: 'Sohrai wall painting is historically practiced by women during seasonal community transitions. RangMitti partners with women-led cooperatives in rural hamlets to provide ergonomic studio setups, subsidized pigment packs, and shared packaging hubs.',
      targets: [
        'Cooperative co-ownership pilot in Saranda forest fringe hamlets',
        'Non-toxic studio safety protocols eliminating respiratory dust exposure',
        'Skill-sharing workshops between veteran master painters and next-generation youth',
      ],
    },
  ];

  return (
    <div className="bg-ivory-warm min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Pilot Impact & Verification Framework</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal leading-tight">
            Measurable, Ethical & Honest Impact
          </h1>

          <p className="text-sm sm:text-base text-secondary leading-relaxed">
            RangMitti 2.0 rejects exaggerated claims and unverified marketing metrics. We outline clear, verifiable pilot targets focused on responsible mineral valorization and equitable tribal livelihood creation in Jharkhand.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="space-y-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-paper border border-border shadow-sm space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-charcoal">
                    {pillar.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  {pillar.description}
                </p>

                <div className="p-4 rounded-2xl bg-ivory-warm border border-border space-y-2 text-xs">
                  <span className="font-bold text-charcoal uppercase tracking-wider text-[11px] block">
                    Verified Pilot Benchmarks:
                  </span>
                  <ul className="space-y-1.5">
                    {pillar.targets.map((target, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-secondary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                        <span>{target}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Competition Disclosure */}
        <div className="p-6 rounded-2xl bg-paper border border-sand shadow-sm text-xs text-secondary flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-charcoal">Idea Tribe 2026 Disclosure Statement:</p>
            <p className="leading-relaxed">
              All socio-economic and environmental valorization methodologies detailed on this platform represent active research proposals by the student team of CSE 2025–2029, West Singhbhum, Jharkhand. Sourcing arrangements and community pilot agreements are currently under validation with institutional partners.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/art"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold shadow-md transition-all gap-1.5"
          >
            <span>Explore Artisan Creations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
