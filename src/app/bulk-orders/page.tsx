'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, CheckCircle2, ArrowRight, ShieldCheck, Building } from 'lucide-react';

export default function BulkOrdersPage() {
  const [formData, setFormData] = useState({
    organization: 'Tata Steel Sustainability Division (Demo)',
    contactPerson: 'Vikramaditya Roy',
    email: 'v.roy@tatasteel.demo',
    phone: '+91 98350 11223',
    inquiryType: 'Corporate Gifting Chests (Set of 100)',
    estimatedQuantity: '100 - 250 Units',
    timeline: 'Q3 2026',
    notes: 'Looking for custom laser-etched wooden boxes with authentic Chiriya mineral pigments and artisan certificates for annual stakeholder summit.',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-ivory-warm min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold">
            <Building className="w-3.5 h-3.5" />
            <span>Institutional Solutions</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Bulk Supplies & Corporate Gifting
          </h1>

          <p className="text-sm text-secondary leading-relaxed max-w-xl mx-auto">
            Custom-formulated mineral pigment consignments for architectural studios, conservators, educational academies, and sustainable corporate gifting programs.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-paper border border-sand shadow-lg space-y-6">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-forest mx-auto animate-bounce" />
              <h3 className="font-serif text-xl font-bold text-charcoal">
                Enquiry Successfully Logged!
              </h3>
              <p className="text-xs text-secondary max-w-sm mx-auto">
                Thank you, <strong>{formData.contactPerson}</strong>. Our institutional liaison desk will contact you at {formData.email} with formulation specs and pilot wholesale pricing.
              </p>
              <div className="pt-2">
                <Link
                  href="/materials"
                  className="px-5 py-2.5 rounded-xl bg-terracotta text-paper text-xs font-semibold"
                >
                  Return to Materials Catalogue
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Company / Institution *</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Enquiry Category *</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  >
                    <option value="Corporate Gifting Chests (Set of 100)">Corporate Gifting Chests</option>
                    <option value="Raw Mineral Pigments Bulk (50kg+)">Raw Mineral Pigments Bulk (50kg+)</option>
                    <option value="Architectural Mural Commission">Architectural Natural Mural Commission</option>
                    <option value="Handmade Paper & Stationery">Handmade Mineral Paper & Stationery</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Estimated Quantity</label>
                  <input
                    type="text"
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Project Brief & Custom Branding Requirements</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit Bulk Order Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
