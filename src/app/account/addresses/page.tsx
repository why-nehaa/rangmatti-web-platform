'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowLeft, Plus } from 'lucide-react';

export default function AccountAddressesPage() {
  return (
    <div className="bg-ivory-warm min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Delivery Addresses
            </h1>
            <p className="text-xs text-secondary mt-1">
              Manage your residential and studio delivery destinations
            </p>
          </div>
          <Link
            href="/account"
            className="text-xs font-semibold text-secondary hover:text-terracotta flex items-center"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to Account
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-paper border-2 border-sand shadow-sm space-y-3 relative">
            <span className="px-2 py-0.5 rounded bg-sand/30 text-charcoal font-bold text-[10px] uppercase">
              Default Delivery Address
            </span>
            <h3 className="font-serif text-base font-bold text-charcoal">Aarav Sharma</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Plot 42, Circular Road, Lalpur<br />
              Ranchi, Jharkhand - 834001<br />
              Phone: +91 98765 43210
            </p>
            <div className="pt-2 text-xs flex gap-3 text-terracotta font-semibold">
              <button className="hover:underline">Edit</button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-paper border border-dashed border-border flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:border-terracotta hover:bg-clay-muted/30 transition-all">
            <Plus className="w-6 h-6 text-terracotta" />
            <p className="font-serif text-sm font-bold text-charcoal">Add New Studio / Address</p>
            <p className="text-xs text-secondary">Save an alternate delivery address</p>
          </div>
        </div>
      </div>
    </div>
  );
}
