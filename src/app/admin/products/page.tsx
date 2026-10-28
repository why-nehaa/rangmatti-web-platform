'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sampleProducts } from '@/data/products';
import { ArrowLeft, Check, X, ShieldAlert, Sparkles, QrCode } from 'lucide-react';

export default function AdminProductApprovalsPage() {
  const [approvedList, setApprovedList] = useState<string[]>([]);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const pendingItem = {
    id: 'PRD-ART-DRAFT-09',
    title: 'Sal Bough & Striped Deer Sohrai Panel',
    artisan: 'Shanti Soren',
    category: 'Paintings & Wall Art',
    price: 3600,
    batch: 'BATCH-2026-LT-PILOT',
    batchStatus: 'Testing In Progress (Awaiting 28-day report)',
    materials: 'Saranda Muted Umber Lateritic Wash, Sal Twig Brush',
    image: '/images/brand/artisan-hands.jpg',
  };

  const handleApprove = () => {
    setApprovedList([...approvedList, pendingItem.id]);
    setActionNotice('Product approved & queued for Passport Token issuance!');
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleReject = () => {
    setActionNotice('Feedback note sent to artisan: Requires verified batch certification before publishing.');
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Product Curation & Approval Queue
            </h1>
            <p className="text-xs text-secondary mt-1">
              Verify artisan authorship and confirm bound mineral pigment safety status
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

        {actionNotice && (
          <div className="p-3.5 rounded-xl bg-sand/30 border border-sand text-charcoal text-xs font-semibold">
            {actionNotice}
          </div>
        )}

        {/* Pending Card */}
        {!approvedList.includes(pendingItem.id) ? (
          <div className="p-6 rounded-3xl bg-paper border-2 border-sand shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="px-2.5 py-1 rounded-full bg-sand/30 text-sand-dark text-xs font-bold">
                Pending Curation Approval (1 Item)
              </span>
              <span className="text-xs font-mono text-secondary">ID: {pendingItem.id}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4 relative h-48 w-full rounded-2xl overflow-hidden bg-clay-muted">
                <Image src={pendingItem.image} alt={pendingItem.title} fill className="object-cover" />
              </div>

              <div className="md:col-span-8 space-y-3 text-xs">
                <div>
                  <span className="text-terracotta uppercase font-bold text-[10px]">{pendingItem.category}</span>
                  <h3 className="font-serif text-xl font-bold text-charcoal">{pendingItem.title}</h3>
                  <p className="text-secondary mt-0.5">By master creator <strong>{pendingItem.artisan}</strong></p>
                </div>

                <div className="p-3 rounded-xl bg-ivory-warm border border-border space-y-1">
                  <div className="flex justify-between">
                    <span className="font-semibold text-charcoal">Bound Material Batch:</span>
                    <span className="font-mono text-terracotta font-bold">{pendingItem.batch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-charcoal">Safety Status:</span>
                    <span className="text-sand-dark font-medium">{pendingItem.batchStatus}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-serif text-2xl font-bold text-charcoal">₹{pendingItem.price}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReject}
                      className="px-4 py-2 rounded-xl border border-terracotta text-terracotta text-xs font-semibold hover:bg-terracotta hover:text-paper transition-all"
                    >
                      Request Batch Re-test
                    </button>
                    <button
                      onClick={handleApprove}
                      className="px-5 py-2 rounded-xl bg-forest hover:bg-forest-deep text-paper text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all"
                    >
                      <Check className="w-4 h-4" />
                      Approve for Pilot Exhibition
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-paper border border-border text-center space-y-2">
            <Check className="w-8 h-8 text-forest mx-auto" />
            <h3 className="font-serif text-lg font-bold text-charcoal">All Review Queues Cleared!</h3>
            <p className="text-xs text-secondary">There are currently no outstanding creations awaiting curation clearance.</p>
          </div>
        )}

        {/* Existing Published Catalogue Summary */}
        <div className="p-6 rounded-2xl bg-paper border border-border space-y-4">
          <h3 className="font-serif text-lg font-bold text-charcoal pb-3 border-b border-border">
            Active Catalogued Artworks ({sampleProducts.length})
          </h3>

          <div className="divide-y divide-border text-xs">
            {sampleProducts.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-charcoal">{p.title}</p>
                  <p className="text-secondary">Creator: {p.artisanName} • Batch: {p.materialBatchId}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-serif font-bold text-charcoal">₹{p.price}</span>
                  <Link
                    href={`/passport/${p.passportId}`}
                    className="text-terracotta hover:underline font-semibold flex items-center gap-1 text-[11px]"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    Passport
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
