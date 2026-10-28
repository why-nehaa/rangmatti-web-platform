'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, QrCode, Mail, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-charcoal text-ivory-warm pt-16 pb-12 border-t border-charcoal-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-terracotta flex items-center justify-center text-paper font-serif font-bold text-xl">
                RM
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-paper">
                RangMitti<span className="text-sand text-sm font-sans ml-1 font-semibold">2.0</span>
              </span>
            </div>
            
            <p className="text-sm text-ivory-warm/70 leading-relaxed max-w-sm">
              From Mineral By-Product to Creative Material, Tribal Art & New Livelihoods.
              Connecting geological wealth and indigenous creativity through standardized, safe creative materials and traceable digital passports.
            </p>

            <div className="p-3.5 rounded-xl bg-charcoal-soft/60 border border-white/10 text-xs text-sand/90 space-y-1">
              <p className="font-semibold text-paper flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-sand" />
                Idea Tribe 2026 Finalist Prototype
              </p>
              <p className="text-ivory-warm/60 text-[11px]">
                Concept by student innovators from CSE 2025–2029, West Singhbhum, Jharkhand.
              </p>
            </div>
          </div>

          {/* Marketplace Navigation */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-sand mb-4">
              Marketplaces
            </h4>
            <ul className="space-y-2.5 text-sm text-ivory-warm/75">
              <li>
                <Link href="/materials" className="hover:text-sand transition-colors">
                  RangMitti Materials
                </Link>
              </li>
              <li>
                <Link href="/art" className="hover:text-sand transition-colors">
                  RangMitti Originals
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-sand transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="hover:text-sand transition-colors">
                  Meet the Artisans
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-sand transition-colors">
                  Bulk & Studio Supplies
                </Link>
              </li>
            </ul>
          </div>

          {/* Traceability & Ecosystem */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-sand mb-4">
              Provenance & Mission
            </h4>
            <ul className="space-y-2.5 text-sm text-ivory-warm/75">
              <li>
                <Link href="/passport/RM-001-ART-007" className="hover:text-sand flex items-center transition-colors">
                  <QrCode className="w-3.5 h-3.5 mr-1.5 text-sand" />
                  Product Passport
                </Link>
              </li>
              <li>
                <Link href="/passport/verify" className="hover:text-sand transition-colors">
                  Verify QR Code
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-sand transition-colors">
                  The 8-Stage Value Chain
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-sand transition-colors">
                  Our Story & Team
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-sand transition-colors">
                  Impact Framework
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="hover:text-sand transition-colors">
                  R&D & Mine Partnerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Help */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-sand mb-4">
              Portals & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-ivory-warm/75">
              <li>
                <Link href="/sell" className="hover:text-sand transition-colors font-semibold text-sand">
                  Sell with RangMitti
                </Link>
              </li>
              <li>
                <Link href="/seller/dashboard" className="hover:text-sand transition-colors">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-sand transition-colors">
                  Admin Platform
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-sand transition-colors">
                  Safety & Ordering FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-sand transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sand transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Pilot Transparency */}
        <div className="py-8 border-b border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h5 className="font-serif text-lg font-bold text-paper mb-1">
              Follow Our Pilot Journey
            </h5>
            <p className="text-xs text-ivory-warm/60">
              Receive updates on new mineral batch characterizations, artisan studio residencies, and exhibition dates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2.5 rounded-lg bg-charcoal-soft border border-white/15 text-sm text-paper placeholder-white/40 focus:outline-none focus:border-sand"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-terracotta hover:bg-terracotta-deep text-paper text-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-paper" />
                  Subscribed!
                </>
              ) : (
                <>
                  Join Pilot
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Legal & Attribution Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-ivory-warm/50 gap-4">
          <p className="text-center md:text-left leading-relaxed max-w-2xl">
            © 2026 RangMitti 2.0. All rights reserved. Prepared for Idea Tribe 2026 by student researchers from CSE 2025–2029, West Singhbhum, Jharkhand. Sourcing channels, safety characterizations, and socio-economic outcomes are proposed in the pilot phase.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-ivory-warm/60">
            <Link href="/privacy" className="hover:text-sand transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-sand transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/shipping-returns" className="hover:text-sand transition-colors">
              Fulfillment Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
