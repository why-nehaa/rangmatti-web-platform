'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Upload, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function NewProductCreationPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Paintings & Wall Art');
  const [materialBatchId, setMaterialBatchId] = useState('BATCH-2026-FE-08');
  const [price, setPrice] = useState(4200);
  const [stock, setStock] = useState(2);
  const [dimensions, setDimensions] = useState('50 cm x 40 cm');
  const [weight, setWeight] = useState('1.2 kg');
  const [story, setStory] = useState('');
  const [materialsUsed, setMaterialsUsed] = useState('Chiriya Red Ochre, Singhbhum Kaolin, Handloom Canvas');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        router.push('/seller/products');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="bg-ivory-warm min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Submit New Artwork for Review
            </h1>
            <p className="text-xs text-secondary mt-1">
              Bind your handcrafted piece to a validated mineral batch for digital passport generation
            </p>
          </div>
          <Link
            href="/seller/products"
            className="text-xs font-semibold text-secondary hover:text-terracotta flex items-center"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to Products
          </Link>
        </div>

        <div className="p-8 rounded-3xl bg-paper border border-sand shadow-lg space-y-6">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-forest mx-auto animate-bounce" />
              <h2 className="font-serif text-xl font-bold text-charcoal">
                Artwork Submitted for Curation Review!
              </h2>
              <p className="text-xs text-secondary max-w-sm mx-auto">
                Assigned temporary tracking code. Our regional validation team will verify the pigment batch compatibility and generate the Digital Passport seal.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Image Upload Mock */}
              <div>
                <label className="block font-semibold text-charcoal mb-2">Artwork Photography</label>
                <div className="p-6 rounded-2xl border-2 border-dashed border-sand bg-ivory-warm/60 text-center space-y-2 cursor-pointer hover:border-terracotta transition-colors">
                  <div className="w-10 h-10 rounded-full bg-paper flex items-center justify-center mx-auto text-terracotta shadow-sm">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="font-semibold text-charcoal">Click or drag high-resolution artwork photographs</p>
                  <p className="text-[11px] text-secondary">Front view, macro brush/relief texture, reverse signature</p>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Artwork Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarhul Bloom in Sal Grove - Ochre Canvas"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Medium & Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  >
                    <option value="Paintings & Wall Art">Paintings & Wall Art</option>
                    <option value="Dokra Metal & Mineral Fusion">Dokra Metal & Mineral Fusion</option>
                    <option value="Terracotta Decor">Terracotta Decor</option>
                    <option value="Handcrafted Paper Art">Handcrafted Paper Art</option>
                    <option value="Ceramic Vessels">Ceramic Vessels</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal mb-1">Validated Mineral Batch Used *</label>
                  <select
                    value={materialBatchId}
                    onChange={(e) => setMaterialBatchId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal font-mono font-semibold focus:outline-none focus:border-terracotta"
                  >
                    <option value="BATCH-2026-FE-08">BATCH-2026-FE-08 (Chiriya Red Ochre - Safe)</option>
                    <option value="BATCH-2026-KL-12">BATCH-2026-KL-12 (Singhbhum Kaolin White - Safe)</option>
                    <option value="BATCH-2026-CU-03">BATCH-2026-CU-03 (Ghatsila Verdigris Green - Safe)</option>
                    <option value="BATCH-2026-HM-05">BATCH-2026-HM-05 (Kiriburu Hematite Charcoal - Safe)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Retail Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Quantity Available *</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Materials & Mediums (Comma Separated)</label>
                <input
                  type="text"
                  value={materialsUsed}
                  onChange={(e) => setMaterialsUsed(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Artwork Story & Cultural Lore</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain the motif, ritual tradition, and why this creation connects with Jharkhand's soil and heritage..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-ivory-warm border border-border text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-secondary text-[11px]">
                  All listings require regional curation approval before going live.
                </span>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper font-semibold shadow-md transition-all"
                >
                  {submitting ? 'Submitting to Review Queue...' : 'Submit for Curation & Passport'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
