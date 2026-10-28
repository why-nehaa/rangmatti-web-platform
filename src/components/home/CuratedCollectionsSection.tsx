'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sampleCollections } from '@/data/collections';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CuratedCollectionsSection() {
  return (
    <section className="py-20 bg-paper border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-terracotta">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Edits</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Explore Curated Collections
            </h2>
            <p className="text-sm text-secondary max-w-xl">
              Thoughtfully assembled thematic collections spanning signature tribal masterworks, raw mineral powders, narrative scrolls, and conscious gifting.
            </p>
          </div>

          <Link
            href="/collections"
            className="inline-flex items-center text-xs font-semibold text-terracotta hover:underline"
          >
            <span>View All Collections ({sampleCollections.length})</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleCollections.slice(0, 3).map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group rounded-2xl bg-ivory-warm border border-border overflow-hidden hover:border-sand hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-64 w-full bg-clay-muted overflow-hidden">
                <Image
                  src={collection.bannerImage}
                  alt={collection.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                <div className="absolute bottom-4 inset-x-4 space-y-1 text-paper">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-sand">
                    {collection.productCount} Works & Pigments
                  </span>
                  <h3 className="font-serif text-xl font-bold">
                    {collection.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                  {collection.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {collection.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-clay-muted text-charcoal font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-terracotta group-hover:text-terracotta-deep">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Highlight Banner for Corporate Gifting & Custom Orders */}
        <div className="mt-12 rounded-2xl bg-ivory-warm border border-sand p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest">
              Corporate & Architectural Solutions
            </span>
            <h3 className="font-serif text-2xl font-bold text-charcoal">
              Custom Corporate Gifting & Natural Architectural Finishes
            </h3>
            <p className="text-sm text-secondary leading-relaxed">
              Elevate your organization's sustainability portfolio with custom-boxed mineral pigment sample chests, bespoke tribal artworks, and non-toxic mural commissions for eco-conscious institutions.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <Link
              href="/bulk-orders"
              className="px-6 py-3 rounded-xl bg-forest hover:bg-forest-deep text-paper text-xs font-semibold transition-colors shadow-md"
            >
              Request Institutional Proposal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
