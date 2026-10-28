'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { User, ShoppingBag, MapPin, Heart, ShieldCheck, ArrowRight, Store } from 'lucide-react';

export default function AccountPage() {
  const { orders, wishlist, demoRole, setDemoRole } = useStore();

  return (
    <div className="bg-ivory-warm min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Header */}
        <div className="p-8 rounded-3xl bg-paper border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-sand/40 border-2 border-sand flex items-center justify-center text-charcoal font-serif font-bold text-2xl">
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-charcoal">Aarav Sharma</h1>
                <span className="px-2 py-0.5 rounded-full bg-sand/30 text-charcoal text-[10px] font-bold">
                  Patron Member
                </span>
              </div>
              <p className="text-xs text-secondary mt-0.5">aarav.sharma@example.com • Ranchi, Jharkhand</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/account/orders"
              className="px-4 py-2 rounded-xl bg-ivory-warm border border-border hover:border-terracotta text-charcoal text-xs font-semibold"
            >
              My Orders ({orders.length})
            </Link>
            <Link
              href="/wishlist"
              className="px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold"
            >
              Saved Items ({wishlist.length})
            </Link>
          </div>
        </div>

        {/* Quick Hub Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/account/orders"
            className="p-6 rounded-2xl bg-paper border border-border hover:border-sand hover:shadow-md transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">My Orders</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Track simulated shipments, inspect delivery status, and access digital passports.
            </p>
            <span className="text-xs font-semibold text-terracotta inline-flex items-center">
              View {orders.length} Orders →
            </span>
          </Link>

          <Link
            href="/wishlist"
            className="p-6 rounded-2xl bg-paper border border-border hover:border-sand hover:shadow-md transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">Curated Wishlist</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Keep track of tribal canvases and mineral powders you wish to commission.
            </p>
            <span className="text-xs font-semibold text-forest inline-flex items-center">
              View {wishlist.length} Items →
            </span>
          </Link>

          <Link
            href="/seller/dashboard"
            onClick={() => setDemoRole('seller')}
            className="p-6 rounded-2xl bg-paper border border-sand hover:border-terracotta hover:shadow-md transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-sand/30 text-charcoal flex items-center justify-center">
              <Store className="w-5 h-5 text-terracotta" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">Artisan Portal</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Switch to Creator / Artisan mode to list artworks, monitor batches, and review earnings.
            </p>
            <span className="text-xs font-semibold text-terracotta inline-flex items-center">
              Open Seller Portal →
            </span>
          </Link>
        </div>

        {/* Recent Order Preview */}
        {orders.length > 0 && (
          <div className="p-6 rounded-2xl bg-paper border border-border space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-lg font-bold text-charcoal">Recent Activity</h3>
              <Link href="/account/orders" className="text-xs font-semibold text-terracotta hover:underline">
                View All Orders
              </Link>
            </div>
            <div className="p-4 rounded-xl bg-ivory-warm border border-border flex items-center justify-between text-xs">
              <div>
                <p className="font-mono font-bold text-charcoal">{orders[0].orderId}</p>
                <p className="text-secondary">
                  {orders[0].items.length} items • Total: ₹{orders[0].total.toLocaleString('en-IN')}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-forest/15 text-forest font-semibold text-[11px]">
                {orders[0].orderStatus}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
