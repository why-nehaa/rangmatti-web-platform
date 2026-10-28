'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { ShoppingBag, QrCode, Truck, ArrowLeft, ArrowRight } from 'lucide-react';

export default function AccountOrdersPage() {
  const { orders } = useStore();

  return (
    <div className="bg-ivory-warm min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Order History
            </h1>
            <p className="text-xs text-secondary mt-1">
              Track simulated consignments and view digital provenance passports
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

        {orders.length === 0 ? (
          <div className="text-center py-16 p-6 rounded-2xl bg-paper border border-border space-y-3">
            <ShoppingBag className="w-10 h-10 text-secondary mx-auto" />
            <h3 className="font-serif text-lg font-bold text-charcoal">No Orders Placed Yet</h3>
            <p className="text-xs text-secondary">
              Browse our collections to place your first simulated order.
            </p>
            <Link
              href="/art"
              className="inline-flex px-4 py-2 rounded-xl bg-terracotta text-paper text-xs font-semibold"
            >
              Browse Tribal Art
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-border gap-2 text-xs">
                  <div>
                    <span className="text-secondary">Order Ref: </span>
                    <strong className="font-mono text-charcoal">{order.orderId}</strong>
                  </div>
                  <div>
                    <span className="text-secondary">Placed on: </span>
                    <span className="text-charcoal font-medium">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-forest/15 text-forest font-semibold text-[11px]">
                      {order.orderStatus}
                    </span>
                    <span className="font-mono text-[10px] text-secondary">
                      Trk: {order.trackingNumber}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-border/60">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                      <div className="flex items-center space-x-3 w-full sm:w-auto">
                        <div className="relative h-12 w-12 rounded-lg bg-clay-muted overflow-hidden shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-charcoal">{item.name}</p>
                          <p className="text-[11px] text-secondary">
                            Qty: {item.quantity} • By {item.sellerName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 self-end sm:self-center">
                        {item.passportId && (
                          <Link
                            href={`/passport/${item.passportId}`}
                            className="text-terracotta hover:underline font-semibold flex items-center gap-1 text-[11px]"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>Digital Passport</span>
                          </Link>
                        )}
                        <span className="font-serif font-bold text-charcoal">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between text-xs gap-2">
                  <span className="text-secondary">
                    Total: <strong className="font-serif text-sm text-charcoal">₹{order.total.toLocaleString('en-IN')}</strong> ({order.paymentMethod})
                  </span>

                  <Link
                    href={`/order-confirmation/${order.orderId}`}
                    className="text-terracotta hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>View Confirmation & Tracking Receipt</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
