'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { ArrowLeft, ShoppingBag, Truck, CheckCircle2 } from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders } = useStore();

  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Platform Orders & Logistics Monitor
            </h1>
            <p className="text-xs text-secondary mt-1">
              Real-time monitoring of simulated customer purchases and multi-vendor settlements
            </p>
          </div>
          <Link
            href="/admin"
            className="text-xs font-semibold text-secondary hover:text-terracotta flex items-center"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Admin Overview
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-paper border border-border shadow-sm space-y-4">
          <div className="divide-y divide-border text-xs">
            {orders.map((ord) => (
              <div key={ord.orderId} className="py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1 w-full md:w-auto">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-terracotta">{ord.orderId}</span>
                    <span className="px-2 py-0.5 rounded-full bg-forest/15 text-forest font-semibold text-[10px]">
                      {ord.orderStatus}
                    </span>
                  </div>
                  <p className="font-semibold text-charcoal">Buyer: {ord.customerName} ({ord.customerEmail})</p>
                  <p className="text-secondary">{ord.items.length} items • Ship to: {ord.shippingAddress.city}, {ord.shippingAddress.state}</p>
                  <p className="font-mono text-[10px] text-secondary">Trk: {ord.trackingNumber}</p>
                </div>

                <div className="flex items-center space-x-6 self-end md:self-center">
                  <div className="text-right">
                    <span className="font-serif text-lg font-bold text-charcoal">₹{ord.total.toLocaleString('en-IN')}</span>
                    <p className="text-[10px] text-forest">{ord.paymentStatus}</p>
                  </div>

                  <Link
                    href={`/order-confirmation/${ord.orderId}`}
                    className="px-3.5 py-1.5 rounded-lg bg-ivory-warm border border-border hover:border-terracotta font-semibold"
                  >
                    View Receipt
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
