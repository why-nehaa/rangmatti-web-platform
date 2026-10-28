'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sampleCollections } from '@/data/collections';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CollectionsIndexPage() {
  return (
    <div className="bg-ivory-warm min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sand/30 border border-sand text-xs font-semibold text-charcoal">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Thematic Series</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal leading-tight">
            Curated Collections
          </h1>

          <p className="text-sm sm:text-base text-secondary leading-relaxed">
            Explore carefully curated thematic selections spanning tribal masterworks, raw mineral pigments, limited studio editions, and conscious corporate gifts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleCollections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group rounded-3xl bg-paper border border-border overflow-hidden hover:border-sand hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="relative h-64 w-full bg-clay-muted overflow-hidden">
                <Image
                  src={col.bannerImage}
                  alt={col.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-4 text-paper">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-sand">
                    {col.productCount} Works & Media
                  </span>
                  <h2 className="font-serif text-xl font-bold">{col.title}</h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                  {col.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {col.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-ivory-warm border border-border text-charcoal text-[11px]"
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
      </div>
    </div>
  );
}
