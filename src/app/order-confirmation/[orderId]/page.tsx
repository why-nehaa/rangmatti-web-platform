'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Truck, 
  QrCode, 
  Package, 
  MapPin, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = (params?.orderId as string) || '';
  const { getOrderById } = useStore();

  const order = getOrderById(orderId);

  useEffect(() => {
    // Fire celebratory confetti for the order!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A85E3B', '#536849', '#D1B58B', '#7E422D'],
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="bg-ivory-warm min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Success Header Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-paper border-2 border-sand shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-forest/15 border-2 border-forest flex items-center justify-center mx-auto text-forest shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-forest">
            Order Confirmed & Logged
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Thank You for Supporting Tribal Art & Mineral Innovation!
          </h1>

          <p className="text-sm text-secondary max-w-lg mx-auto leading-relaxed">
            Your simulated order has been registered under the RangMitti 2.0 demonstration ledger. Your pieces are being curated and packaged in acid-free archival enclosures.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-ivory-warm border border-border text-xs font-mono">
              Order Ref: <strong className="text-charcoal">{orderId}</strong>
            </div>
            <div className="px-4 py-2 rounded-xl bg-forest/10 border border-forest/20 text-xs text-forest font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Simulated Payment Verified (Demo)</span>
            </div>
          </div>
        </div>

        {/* Order Details & Logistics */}
        {order && (
          <div className="p-8 rounded-3xl bg-paper border border-border shadow-md space-y-6">
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-border gap-2">
              <div>
                <p className="text-xs text-secondary font-medium">Estimated Delivery</p>
                <p className="font-serif text-lg font-bold text-charcoal">
                  3–5 Business Days (Tracked)
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-secondary font-medium">Consignment Tracking</p>
                <p className="font-mono text-xs font-bold text-terracotta">
                  {order.trackingNumber}
                </p>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold text-charcoal">
                Ordered Creations & Provenance Links
              </h3>

              <div className="divide-y divide-border border border-border rounded-2xl overflow-hidden">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-paper">
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <div className="relative h-14 w-14 rounded-xl bg-clay-muted overflow-hidden shrink-0 border border-border">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-semibold text-xs text-charcoal">{item.name}</p>
                        <p className="text-[11px] text-secondary">
                          Qty: {item.quantity} • Creator: {item.sellerName}
                        </p>
                        {item.passportId && (
                          <Link
                            href={`/passport/${item.passportId}`}
                            className="inline-flex items-center text-[10px] text-terracotta hover:underline font-bold"
                          >
                            <QrCode className="w-3 h-3 mr-1" />
                            Inspect Digital Passport ({item.passportId}) →
                          </Link>
                        )}
                      </div>
                    </div>

                    <span className="font-serif font-bold text-sm text-charcoal self-end sm:self-center">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="p-4 rounded-2xl bg-ivory-warm border border-border text-xs text-secondary space-y-1">
              <p className="font-bold text-charcoal flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                Shipping To:
              </p>
              <p className="text-charcoal font-medium">
                {order.customerName} • {order.customerPhone}
              </p>
              <p>
                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              {order.shippingAddress.deliveryNotes && (
                <p className="italic text-[11px] text-secondary pt-1">
                  Note: "{order.shippingAddress.deliveryNotes}"
                </p>
              )}
            </div>

            {/* Totals */}
            <div className="pt-2 border-t border-border flex justify-between items-baseline text-xs">
              <span className="text-secondary">Total Settled (Simulated Demo):</span>
              <span className="font-serif text-2xl font-bold text-charcoal">
                ₹{order.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/account/orders"
            className="px-6 py-3 rounded-xl bg-charcoal hover:bg-charcoal-soft text-paper text-xs font-semibold shadow-sm transition-all"
          >
            View in My Orders History
          </Link>
          <Link
            href="/art"
            className="px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Continue Exploring Creations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
