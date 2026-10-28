'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { OrderRecord } from '@/types';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Building, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, shipping, discount, total, addOrder, clearCart } = useStore();

  // Form states
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    street: 'Plot 42, Circular Road, Lalpur',
    city: 'Ranchi',
    state: 'Jharkhand',
    pincode: '834001',
    deliveryNotes: 'Please handle with care; art canvas inside.',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="bg-ivory-warm min-h-screen py-20 px-4 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-charcoal">
          Your cart is empty
        </h1>
        <p className="text-xs text-secondary">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          href="/art"
          className="inline-flex px-5 py-2.5 rounded-xl bg-terracotta text-paper text-xs font-semibold"
        >
          Browse Marketplace
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.street || !formData.pincode) {
      setError('Please fill in all required shipping address fields.');
      return;
    }
    if (!agreedTerms) {
      setError('Please acknowledge the terms of service to proceed.');
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const orderId = `RM-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingNumber = `RM-DEL-${Math.floor(100000 + Math.random() * 900000)}-IN`;

      const newOrder: OrderRecord = {
        orderId,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          deliveryNotes: formData.deliveryNotes,
        },
        items: cart.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
          sellerName: i.sellerName,
          passportId: i.passportId,
        })),
        subtotal,
        shippingFee: shipping,
        discount,
        total,
        paymentMethod:
          paymentMethod === 'upi'
            ? 'Simulated UPI (Demo Mode)'
            : paymentMethod === 'card'
            ? 'Simulated RuPay / Card (Demo Mode)'
            : 'Simulated Net Banking (Demo Mode)',
        paymentStatus: 'Simulated Paid (Demo)',
        orderStatus: 'Confirmed',
        createdAt: new Date().toISOString(),
        trackingNumber,
      };

      addOrder(newOrder);
      clearCart();
      router.push(`/order-confirmation/${orderId}`);
    }, 1200);
  };

  return (
    <div className="bg-ivory-warm min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-terracotta mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Demo Checkout</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal">
            Shipping & Demonstration Payment
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form: Delivery Address & Payment Mode */}
          <div className="lg:col-span-7 space-y-8">
            {/* Shipping Information Card */}
            <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-charcoal pb-3 border-b border-border flex items-center gap-2">
                <Truck className="w-5 h-5 text-terracotta" />
                Delivery Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-charcoal mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-charcoal mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-charcoal mb-1">Postal PIN Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-charcoal mb-1">Delivery Notes (Optional)</label>
                  <textarea
                    rows={2}
                    value={formData.deliveryNotes}
                    onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options (Simulated Demo Mode) */}
            <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
                  <Lock className="w-5 h-5 text-forest" />
                  Simulated Payment Mode (Demo)
                </h2>
                <span className="text-[10px] bg-sand/30 font-bold px-2 py-0.5 rounded text-charcoal">
                  NO REAL CHARGES
                </span>
              </div>

              <p className="text-xs text-secondary leading-relaxed">
                For the Idea Tribe 2026 jury demonstration, you can select any simulated payment rail. No real money will be deducted and no sensitive credit card credentials are stored.
              </p>

              <div className="space-y-2 text-xs">
                {/* UPI Option */}
                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-clay-muted text-charcoal border-terracotta font-semibold'
                      : 'border-border hover:bg-ivory-warm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-4 h-4 text-terracotta" />
                    <div>
                      <p className="font-bold">Instant UPI (GPay, PhonePe, Paytm)</p>
                      <p className="text-[11px] text-secondary">Simulated instant zero-fee transaction</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-terracotta"
                  />
                </label>

                {/* Card Option */}
                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-clay-muted text-charcoal border-terracotta font-semibold'
                      : 'border-border hover:bg-ivory-warm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-4 h-4 text-terracotta" />
                    <div>
                      <p className="font-bold">RuPay / Debit / Credit Card</p>
                      <p className="text-[11px] text-secondary">Simulated sandbox gateway</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-terracotta"
                  />
                </label>

                {/* Net Banking */}
                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'bg-clay-muted text-charcoal border-terracotta font-semibold'
                      : 'border-border hover:bg-ivory-warm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Building className="w-4 h-4 text-terracotta" />
                    <div>
                      <p className="font-bold">Indian Net Banking</p>
                      <p className="text-[11px] text-secondary">State Bank of India, HDFC, ICICI (Simulated)</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="accent-terracotta"
                  />
                </label>
              </div>

              {/* Terms check */}
              <div className="pt-2">
                <label className="flex items-start space-x-2 text-xs text-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 accent-terracotta"
                  />
                  <span>
                    I acknowledge that this is an Idea Tribe 2026 student demonstration platform, and I agree to RangMitti's ethical artisan fair-trade and mineral safety policies.
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-charcoal pb-3 border-b border-border">
                Review Items ({cart.length})
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs divide-y divide-border/60">
                {cart.map((item) => (
                  <div key={item.id} className="pt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-12 w-12 rounded-lg bg-clay-muted overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal line-clamp-1">{item.name}</p>
                        <p className="text-[11px] text-secondary">Qty: {item.quantity} • By {item.sellerName}</p>
                      </div>
                    </div>
                    <span className="font-serif font-bold text-charcoal shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2 pt-3 border-t border-border text-xs">
                <div className="flex justify-between text-secondary">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>Shipping</span>
                  <span className="font-semibold text-charcoal">
                    {shipping === 0 ? <strong className="text-forest">FREE</strong> : `₹${shipping}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-forest font-semibold">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-border flex justify-between items-baseline">
                  <span className="text-sm font-bold text-charcoal">Total Payable</span>
                  <span className="font-serif text-2xl font-bold text-charcoal">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {error && (
                <p className="p-2.5 rounded-lg bg-terracotta/10 text-terracotta text-xs font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-terracotta hover:bg-terracotta-deep disabled:bg-secondary text-paper text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Generating Provenance Order...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Simulated Order (₹{total.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>

              <div className="p-3 bg-ivory-warm rounded-xl border border-border text-[11px] text-secondary space-y-1">
                <p className="font-semibold text-charcoal">Demo Order Fulfillment Notice:</p>
                <p>
                  Upon clicking submit, a verified order confirmation record will be written to your session, complete with simulated dispatch tracking and digital passport links.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
