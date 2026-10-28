'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Store, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SellerRegisterPage() {
  const router = useRouter();
  const { setDemoRole } = useStore();

  const [formData, setFormData] = useState({
    fullName: 'Shanti Soren',
    email: 'shanti.soren@artisan.rangmitti.in',
    phone: '+91 94311 22334',
    sellerType: 'Artisan',
    region: 'Saranda Fringe, West Singhbhum',
    craftCategory: 'Sohrai & Khovar Mural Painting',
    bio: 'Practicing traditional Santhal Sohrai mud wall art for 18 years. Now adapting earth murals to natural cotton canvas using tested iron and kaolin mineral pigments.',
    consentPublish: true,
    termsAccepted: true,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setDemoRole('seller');
      router.push('/seller/dashboard');
    }, 1500);
  };

  return (
    <div className="bg-ivory-warm min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sand/30 text-charcoal text-xs font-semibold">
            <Store className="w-3.5 h-3.5 text-terracotta" />
            <span>Onboarding Portal</span>
          </div>

          <h1 className="font-serif text-3xl font-bold text-charcoal">
            Artisan & Supplier Registration
          </h1>

          <p className="text-xs sm:text-sm text-secondary">
            Join the verified RangMitti creator collective. All applications are reviewed by our regional committee for authenticity and material compliance.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-paper border border-sand shadow-lg space-y-6">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-forest mx-auto animate-bounce" />
              <h3 className="font-serif text-xl font-bold text-charcoal">
                Application Received!
              </h3>
              <p className="text-xs text-secondary max-w-sm mx-auto">
                Redirecting to your new simulated Seller Dashboard as <strong>{formData.fullName}</strong>...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Seller Type *</label>
                  <select
                    value={formData.sellerType}
                    onChange={(e) => setFormData({ ...formData, sellerType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  >
                    <option value="Artisan">Indigenous Artisan</option>
                    <option value="Creative-material supplier">Creative-material Supplier</option>
                    <option value="Artist or designer">Contemporary Artist or Designer</option>
                    <option value="Business or studio">Studio / Creative Business</option>
                    <option value="Cooperative or eligible organization">Cooperative / SHG Federation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Geographic Region / District *</label>
                  <input
                    type="text"
                    required
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    placeholder="e.g. Chaibasa, West Singhbhum"
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Craft or Material Specialization *</label>
                  <input
                    type="text"
                    required
                    value={formData.craftCategory}
                    onChange={(e) => setFormData({ ...formData, craftCategory: e.target.value })}
                    placeholder="e.g. Dokra, Pigment Ball-Milling"
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Profile Story & Artistic Background</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="space-y-2 pt-2 text-secondary">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentPublish}
                    onChange={(e) => setFormData({ ...formData, consentPublish: e.target.checked })}
                    className="mt-0.5 accent-terracotta"
                  />
                  <span>
                    I consent to having my artisan profile and craft lineage published on the RangMitti Digital Passport ledger.
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="mt-0.5 accent-terracotta"
                  />
                  <span>
                    I accept the RangMitti Fair-Trade Covenant and declare that mineral materials used will be screened for non-toxicity.
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-border">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit Application & Enter Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          <div className="text-center pt-2 text-xs text-secondary">
            Already have an active artisan profile?{' '}
            <Link href="/seller/login" className="text-terracotta font-semibold hover:underline">
              Log in to Seller Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
