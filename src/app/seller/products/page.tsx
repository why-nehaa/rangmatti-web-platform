'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sampleProducts } from '@/data/products';
import { Plus, QrCode, ArrowLeft, Clock, CheckCircle2, AlertTriangle, Edit } from 'lucide-react';

export default function SellerProductsPage() {
  const [filter, setFilter] = useState<'all' | 'published' | 'review' | 'draft'>('all');

  type WorkflowStatus = 'Published' | 'Under Review' | 'Draft';

  const allItems: Array<any & { workflowStatus: WorkflowStatus }> = [
    ...sampleProducts.filter((p) => p.artisanId === 'ART-001').map((p) => ({
      ...p,
      workflowStatus: 'Published' as WorkflowStatus,
    })),
    {
      id: 'PRD-ART-DRAFT-09',
      passportId: 'PENDING-VERIFICATION',
      title: 'Sal Bough & Striped Deer Sohrai Panel (Work in Progress)',
      slug: 'sal-bough-striped-deer-panel',
      category: 'Paintings & Wall Art',
      artisanId: 'ART-001',
      artisanName: 'Shanti Soren',
      artisanRegion: 'Saranda Fringe, West Singhbhum',
      materialsUsed: ['Saranda Muted Umber Lateritic Wash (Batch RM-LT-PILOT)'],
      materialBatchId: 'BATCH-2026-LT-PILOT',
      dimensions: '40 cm x 40 cm',
      weight: '1.1 kg',
      price: 3600,
      stock: 1,
      featured: false,
      images: ['/images/brand/artisan-hands.jpg'],
      collection: 'RangMitti Originals',
      story: 'Preliminary submission utilizing the new Saranda lateritic wash.',
      culturalSignificance: 'Spring regeneration motif.',
      workflowStatus: 'Under Review' as WorkflowStatus,
      feedbackNote: 'Awaiting completion of CSIR-NML 28-day leachate test report for Batch RM-LT-PILOT before publishing approval.',
    },
  ];

  const displayed = allItems.filter((i) => {
    if (filter === 'published') return i.workflowStatus === 'Published';
    if (filter === 'review') return i.workflowStatus === 'Under Review';
    if (filter === 'draft') return i.workflowStatus === 'Draft';
    return true;
  });

  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-secondary mb-1">
              <Link href="/seller/dashboard" className="hover:text-terracotta">Dashboard</Link>
              <span>/</span>
              <span className="text-charcoal font-semibold">Artworks Catalogue</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              My Listed Creations
            </h1>
          </div>

          <Link
            href="/seller/products/new"
            className="px-4 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Product Listing</span>
          </Link>
        </div>

        {/* Workflow Status Filter Tabs */}
        <div className="flex items-center space-x-2 text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filter === 'all'
                ? 'bg-charcoal text-paper border-charcoal'
                : 'bg-paper text-secondary border-border hover:border-charcoal'
            }`}
          >
            All Works ({allItems.length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filter === 'published'
                ? 'bg-forest text-paper border-forest'
                : 'bg-paper text-secondary border-border hover:border-forest'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setFilter('review')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filter === 'review'
                ? 'bg-sand-dark text-paper border-sand-dark'
                : 'bg-paper text-secondary border-border hover:border-sand-dark'
            }`}
          >
            Under Review (1)
          </button>
        </div>

        {/* Listings Table / Cards */}
        <div className="rounded-2xl bg-paper border border-border divide-y divide-border overflow-hidden shadow-sm">
          {displayed.map((item) => (
            <div key={item.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <div className="relative h-20 w-20 rounded-xl bg-clay-muted overflow-hidden shrink-0 border border-border">
                  <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-terracotta">
                      {item.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.workflowStatus === 'Published'
                          ? 'bg-forest/15 text-forest'
                          : 'bg-sand/30 text-sand-dark'
                      }`}
                    >
                      {item.workflowStatus}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-charcoal">
                    {item.title}
                  </h3>

                  <p className="text-xs text-secondary">
                    Batch: <span className="font-mono text-terracotta">{item.materialBatchId}</span> • Stock: {item.stock}
                  </p>

                  {'feedbackNote' in item && (
                    <div className="p-2 rounded-lg bg-sand/20 border border-sand/40 text-[11px] text-charcoal flex items-start gap-1.5 mt-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-sand-dark shrink-0 mt-0.5" />
                      <span>{item.feedbackNote}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4 self-end md:self-center">
                <span className="font-serif text-xl font-bold text-charcoal min-w-[90px] text-right">
                  ₹{item.price.toLocaleString('en-IN')}
                </span>

                {item.passportId !== 'PENDING-VERIFICATION' ? (
                  <Link
                    href={`/passport/${item.passportId}`}
                    className="px-3 py-1.5 rounded-lg bg-ivory-warm border border-border text-xs font-semibold text-charcoal hover:text-terracotta flex items-center gap-1"
                  >
                    <QrCode className="w-3.5 h-3.5 text-terracotta" />
                    <span>Passport</span>
                  </Link>
                ) : (
                  <span className="text-[10px] text-secondary font-mono bg-ivory-warm px-2 py-1 rounded">
                    Passport Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
