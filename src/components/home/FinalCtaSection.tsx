'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Store, Handshake } from 'lucide-react';

export default function FinalCtaSection() {
  return (
    <section className="py-24 bg-charcoal text-paper relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-charcoal-soft border border-white/10 text-xs font-semibold text-sand">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Idea Tribe 2026 • Student Startup Mission</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-paper max-w-4xl mx-auto leading-tight">
          Every material has a story. <br />
          <span className="italic text-sand font-normal">Every creation deserves a stage.</span>
        </h2>

        <p className="text-sm sm:text-base text-ivory-warm/75 max-w-2xl mx-auto leading-relaxed">
          Join our mission to unite scientific mineral valorization with indigenous tribal artistry. Whether you are an art collector, creative studio, artisan collective, or institutional partner—there is a place for you in the RangMitti ecosystem.
        </p>

        {/* 3 Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/art"
            className="inline-flex items-center px-6 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-sm font-semibold transition-all shadow-lg hover:shadow-terracotta/20"
          >
            <span>Explore Art & Murals</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          <Link
            href="/sell"
            className="inline-flex items-center px-6 py-3.5 rounded-xl bg-charcoal-soft border border-white/20 hover:border-sand text-paper hover:text-sand text-sm font-semibold transition-all"
          >
            <Store className="w-4 h-4 mr-2" />
            <span>Become a Seller / Creator</span>
          </Link>

          <Link
            href="/partnerships"
            className="inline-flex items-center px-6 py-3.5 rounded-xl bg-forest hover:bg-forest-deep text-paper text-sm font-semibold transition-all"
          >
            <Handshake className="w-4 h-4 mr-2" />
            <span>Partner with RangMitti</span>
          </Link>
        </div>

        <p className="text-xs text-ivory-warm/50 pt-6">
          Developed by students of CSE 2025–2029, West Singhbhum, Jharkhand for Idea Tribe 2026.
        </p>
      </div>
    </section>
  );
}
