'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { sampleProducts } from '@/data/products';
import { ArrowLeft, Save, ShieldCheck } from 'lucide-react';

export default function SellerInventoryPage() {
  const [stockMap, setStockMap] = useState<Record<string, number>>({
    'PRD-ART-001': 4,
    'PRD-ART-005': 3,
  });
  const [saved, setSaved] = useState(false);

  const handleUpdate = (id: string, val: number) => {
    setStockMap((prev) => ({ ...prev, [id]: Math.max(0, val) }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Inventory & Studio Reserves
            </h1>
            <p className="text-xs text-secondary mt-1">
              Update ready-to-dispatch studio stock quantities
            </p>
          </div>
          <Link
            href="/seller/dashboard"
            className="text-xs font-semibold text-secondary hover:text-terracotta flex items-center"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Dashboard
          </Link>
        </div>

        {saved && (
          <div className="p-3 rounded-xl bg-forest/15 border border-forest/30 text-forest text-xs font-semibold">
            ✓ Stock quantities updated in marketplace ledger!
          </div>
        )}

        <div className="p-6 rounded-2xl bg-paper border border-border shadow-sm space-y-4">
          <div className="divide-y divide-border text-xs">
            {sampleProducts.filter((p) => p.artisanId === 'ART-001').map((prd) => (
              <div key={prd.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-base font-bold text-charcoal">{prd.title}</h3>
                  <p className="text-secondary">Batch: {prd.materialBatchId} • Retail: ₹{prd.price}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-secondary font-medium">Ready Stock:</span>
                  <input
                    type="number"
                    min="0"
                    value={stockMap[prd.id] ?? prd.stock}
                    onChange={(e) => handleUpdate(prd.id, Number(e.target.value))}
                    className="w-16 px-2.5 py-1.5 rounded-lg bg-ivory-warm border border-border text-center font-bold text-charcoal focus:outline-none focus:border-terracotta"
                  />
                  <span className="text-secondary text-[11px]">Units</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
