'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Truck, 
  AlertCircle,
  QrCode,
  Sparkles
} from 'lucide-react';

export default function CartPage() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    shipping, 
    discount, 
    couponCode, 
    applyCoupon, 
    total 
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;
    const res = applyCoupon(inputCoupon);
    setCouponMessage({
      text: res.message,
      isError: !res.success,
    });
  };

  // Group items by seller for multi-vendor transparency
  const sellers = Array.from(new Set(cart.map((item) => item.sellerName)));

  return (
    <div className="bg-ivory-warm min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Shopping Cart
            </h1>
            <p className="text-xs text-secondary mt-1">
              {cart.length} unique items in your basket
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-secondary hover:text-terracotta underline"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl bg-paper border border-border shadow-sm max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-sand/20 flex items-center justify-center mx-auto text-terracotta">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              Your Cart is Currently Empty
            </h2>
            <p className="text-xs text-secondary leading-relaxed max-w-sm mx-auto">
              Discover unique artisan-crafted murals and verified mineral pigment powders from West Singhbhum.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/art"
                className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold shadow-sm transition-all"
              >
                Explore Originals
              </Link>
              <Link
                href="/materials"
                className="px-5 py-2.5 rounded-xl bg-paper border border-border hover:border-forest text-forest text-xs font-semibold transition-all"
              >
                Browse Materials
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              {/* Multi-Vendor Breakdown Notice */}
              {sellers.length > 1 && (
                <div className="p-3.5 rounded-xl bg-sand/20 border border-sand/50 text-xs text-secondary flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-charcoal font-semibold">Multi-Vendor Order:</strong> Your order includes works from {sellers.length} distinct artisan workshops/suppliers. All items are dispatched together under RangMitti unified archival packaging.
                  </p>
                </div>
              )}

              {/* Items Cards */}
              <div className="rounded-2xl bg-paper border border-border divide-y divide-border overflow-hidden shadow-sm">
                {cart.map((item) => (
                  <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center justify-between">
                    <div className="flex items-center space-x-4 w-full sm:w-auto">
                      <div className="relative h-24 w-24 rounded-xl bg-clay-muted overflow-hidden shrink-0 border border-border">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-terracotta">
                            {item.type}
                          </span>
                          {item.passportId && (
                            <Link
                              href={`/passport/${item.passportId}`}
                              className="text-[10px] font-mono text-forest font-semibold flex items-center hover:underline"
                            >
                              <QrCode className="w-3 h-3 mr-0.5" />
                              {item.passportId}
                            </Link>
                          )}
                        </div>

                        <h3 className="font-serif text-base font-bold text-charcoal">
                          <Link href={item.type === 'material' ? '/materials' : `/product/${item.slug}`}>
                            {item.name}
                          </Link>
                        </h3>

                        <p className="text-xs text-secondary">
                          By <span className="font-semibold text-charcoal">{item.sellerName}</span>
                        </p>

                        <p className="text-xs font-serif font-bold text-charcoal sm:hidden pt-1">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Price */}
                    <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-border">
                      <div className="flex items-center border border-border rounded-lg bg-ivory-warm overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs font-bold text-charcoal hover:bg-clay-muted"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="px-2.5 py-1 text-xs font-bold text-charcoal hover:bg-clay-muted disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>

                      <div className="hidden sm:block text-right min-w-[90px]">
                        <p className="font-serif text-base font-bold text-charcoal">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                        <p className="text-[10px] text-secondary">
                          ₹{item.price.toLocaleString('en-IN')} each
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-secondary hover:text-terracotta rounded-lg hover:bg-ivory-warm transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="flex justify-between items-center text-xs">
                <Link href="/art" className="text-terracotta font-semibold hover:underline flex items-center">
                  ← Continue Shopping
                </Link>
                <span className="text-secondary">Free Shipping on orders above ₹999</span>
              </div>
            </div>

            {/* Order Summary & Coupon Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Order Summary Box */}
              <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-5">
                <h3 className="font-serif text-lg font-bold text-charcoal pb-3 border-b border-border">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-secondary">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-secondary">
                    <span>Shipping & Handling</span>
                    <span className="font-semibold text-charcoal">
                      {shipping === 0 ? <strong className="text-forest">FREE</strong> : `₹${shipping}`}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-forest font-semibold">
                      <span>Promo Discount ({couponCode})</span>
                      <span>-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-border flex justify-between items-baseline">
                    <span className="text-sm font-bold text-charcoal">Total Amount</span>
                    <span className="font-serif text-2xl font-bold text-charcoal">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="pt-2 space-y-2">
                  <label className="block text-[11px] font-bold text-charcoal uppercase tracking-wider">
                    Promotional / Jury Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Try 'IDEATRIBE2026'"
                      className="flex-1 px-3 py-2 rounded-lg bg-ivory-warm border border-border text-xs uppercase font-mono text-charcoal focus:outline-none focus:border-terracotta"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-charcoal hover:bg-charcoal-soft text-paper text-xs font-semibold"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <p
                      className={`text-[11px] font-medium ${
                        couponMessage.isError ? 'text-terracotta' : 'text-forest'
                      }`}
                    >
                      {couponMessage.text}
                    </p>
                  )}
                </form>

                {/* Checkout CTA */}
                <div className="pt-2">
                  <Link
                    href="/checkout"
                    className="w-full py-3.5 px-4 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Secure Demo Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-[10px] text-center text-secondary mt-2">
                    Simulated safe sandbox payment • No real credit card charged
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-4 rounded-xl bg-ivory-warm border border-border text-xs text-secondary space-y-2">
                <div className="flex items-center space-x-2 text-charcoal font-semibold">
                  <ShieldCheck className="w-4 h-4 text-forest" />
                  <span>The RangMitti Promise</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Every order includes authentic product provenance, individual artisan attribution, and verified mineral batch safety records.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
