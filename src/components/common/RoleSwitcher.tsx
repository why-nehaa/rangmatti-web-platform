'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { 
  ShieldCheck, 
  Store, 
  User, 
  Sparkles, 
  ChevronRight, 
  X, 
  QrCode,
  Layers
} from 'lucide-react';

export default function RoleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { demoRole, setDemoRole } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  // If in print view, hide
  if (typeof window !== 'undefined' && window.location.search.includes('print')) {
    return null;
  }

  return (
    <aside aria-label="Demo Mode Navigator" className="fixed bottom-5 right-5 z-50 no-print">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-charcoal text-paper shadow-2xl border border-sand/40 hover:scale-105 transition-all text-xs font-semibold group"
          title="Switch Demo Role (Idea Tribe 2026 Presentation)"
        >
          <span className="w-2 h-2 rounded-full bg-sand animate-ping" />
          <span>Demo Role:</span>
          <span className="capitalize text-sand underline decoration-sand/50">
            {demoRole}
          </span>
          <Layers className="w-3.5 h-3.5 ml-1 text-sand" />
        </button>
      ) : (
        <div className="w-80 bg-paper rounded-2xl shadow-2xl border border-sand p-4 text-charcoal animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-terracotta" />
              <span className="font-serif text-sm font-bold text-charcoal">
                Demo Experience Panel
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-ivory-warm text-secondary"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-secondary my-2 leading-tight">
            Idea Tribe 2026 Live Presentation Switcher. Explore different user perspectives:
          </p>

          <div className="space-y-1.5 pt-1">
            {/* Customer Role */}
            <button
              onClick={() => {
                setDemoRole('customer');
                if (pathname.startsWith('/seller') || pathname.startsWith('/admin')) {
                  router.push('/');
                }
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                demoRole === 'customer'
                  ? 'bg-clay-muted text-charcoal font-bold border border-sand'
                  : 'hover:bg-ivory-warm text-charcoal/80'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-sand/30 flex items-center justify-center text-charcoal">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold">Customer / Buyer</p>
                  <p className="text-[10px] text-secondary font-normal">
                    Browse materials, art, cart, checkout
                  </p>
                </div>
              </div>
              {demoRole === 'customer' && <span className="text-[10px] text-terracotta font-bold">Active</span>}
            </button>

            {/* Seller Role */}
            <button
              onClick={() => {
                setDemoRole('seller');
                router.push('/seller/dashboard');
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                demoRole === 'seller'
                  ? 'bg-clay-muted text-charcoal font-bold border border-sand'
                  : 'hover:bg-ivory-warm text-charcoal/80'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-terracotta/20 flex items-center justify-center text-terracotta">
                  <Store className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold">Artisan / Seller Portal</p>
                  <p className="text-[10px] text-secondary font-normal">
                    List artworks, check sales & payouts
                  </p>
                </div>
              </div>
              {demoRole === 'seller' && <span className="text-[10px] text-terracotta font-bold">Active</span>}
            </button>

            {/* Admin Role */}
            <button
              onClick={() => {
                setDemoRole('admin');
                router.push('/admin');
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                demoRole === 'admin'
                  ? 'bg-clay-muted text-charcoal font-bold border border-sand'
                  : 'hover:bg-ivory-warm text-charcoal/80'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-forest/20 flex items-center justify-center text-forest">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold">Platform Admin Panel</p>
                  <p className="text-[10px] text-secondary font-normal">
                    Batch validation, approvals, passports
                  </p>
                </div>
              </div>
              {demoRole === 'admin' && <span className="text-[10px] text-forest font-bold">Active</span>}
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[11px]">
            <Link
              href="/passport/RM-001-ART-007"
              className="text-terracotta hover:underline font-semibold flex items-center"
            >
              <QrCode className="w-3 h-3 mr-1" />
              Test Live Passport
            </Link>
            <span className="text-[10px] text-secondary">Idea Tribe 2026</span>
          </div>
        </div>
      )}
    </aside>
  );
}
