'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Store, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SellerLoginPage() {
  const router = useRouter();
  const { setDemoRole } = useStore();
  const [email, setEmail] = useState('shanti.soren@artisan.rangmitti.in');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoRole('seller');
    router.push('/seller/dashboard');
  };

  const handleQuickDemoLogin = (artisanName: string) => {
    setDemoRole('seller');
    router.push('/seller/dashboard');
  };

  return (
    <div className="bg-ivory-warm min-h-screen py-16 px-4">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-terracotta flex items-center justify-center text-paper mx-auto shadow-md">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-charcoal">
            Seller & Artisan Sign In
          </h1>
          <p className="text-xs text-secondary">
            Manage your registered artworks, inventory, passport seals, and earnings
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-paper border border-sand shadow-lg space-y-6">
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-charcoal mb-1">Registered Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
              />
            </div>
            <div>
              <label className="block font-semibold text-charcoal mb-1">Password</label>
              <input
                type="password"
                defaultValue="demo1234"
                className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Access Seller Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Jury Demo Access */}
          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-terracotta">
              <Sparkles className="w-4 h-4" />
              <span>Idea Tribe 2026 Jury One-Click Access</span>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleQuickDemoLogin('Shanti Soren')}
                className="w-full p-2.5 rounded-xl bg-ivory-warm hover:bg-clay-muted border border-border text-left text-xs font-semibold text-charcoal transition-colors flex items-center justify-between"
              >
                <span>Login as Shanti Soren (Artisan)</span>
                <ArrowRight className="w-3.5 h-3.5 text-terracotta" />
              </button>

              <button
                onClick={() => handleQuickDemoLogin('Singhbhum Minerals')}
                className="w-full p-2.5 rounded-xl bg-ivory-warm hover:bg-clay-muted border border-border text-left text-xs font-semibold text-charcoal transition-colors flex items-center justify-between"
              >
                <span>Login as Singhbhum Minerals (Supplier)</span>
                <ArrowRight className="w-3.5 h-3.5 text-forest" />
              </button>
            </div>
          </div>

          <div className="text-center pt-2 text-xs text-secondary">
            Don't have an artisan listing yet?{' '}
            <Link href="/seller/register" className="text-terracotta font-semibold hover:underline">
              Apply for Onboarding
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
