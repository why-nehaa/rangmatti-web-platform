'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { sampleMaterials } from '@/data/materials';
import { ValidationStatus } from '@/types';
import { ArrowLeft, FlaskConical, ShieldCheck, Plus, Check } from 'lucide-react';

export default function AdminMaterialsPage() {
  const [materials, setMaterials] = useState(sampleMaterials);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const handleStatusChange = (id: string, newStatus: ValidationStatus) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, validationStatus: newStatus } : m))
    );
    setStatusNotice(`Updated validation status for ${id} to "${newStatus}"`);
    setTimeout(() => setStatusNotice(null), 3000);
  };

  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Material Stream Registry & Validation
            </h1>
            <p className="text-xs text-secondary mt-1">
              Audit by-product streams and update formal pilot clearance status
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

        {statusNotice && (
          <div className="p-3.5 rounded-xl bg-forest/15 border border-forest/30 text-forest text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{statusNotice}</span>
          </div>
        )}

        <div className="p-6 rounded-3xl bg-paper border border-border shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="text-xs font-bold text-charcoal">Active Geological Material Lots ({materials.length})</span>
            <Link
              href="/admin/material-tests"
              className="text-xs text-forest hover:underline font-semibold flex items-center gap-1"
            >
              <FlaskConical className="w-4 h-4" />
              Open Lab Chemical Screening Reports →
            </Link>
          </div>

          <div className="space-y-4">
            {materials.map((mat) => (
              <div
                key={mat.id}
                className="p-5 rounded-2xl bg-ivory-warm border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: mat.hexCode }}
                    />
                    <span className="font-mono font-bold text-terracotta">{mat.labTestSummary.batchNumber}</span>
                    <span className="text-secondary">•</span>
                    <span className="text-secondary">{mat.mineralSource}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-charcoal">{mat.name}</h3>

                  <p className="text-secondary text-[11px] max-w-xl">
                    Intended Use: {mat.intendedUse}
                  </p>
                </div>

                {/* Status Switcher */}
                <div className="flex items-center space-x-3 self-end md:self-center">
                  <span className="text-secondary font-medium">Status:</span>
                  <select
                    value={mat.validationStatus}
                    onChange={(e) => handleStatusChange(mat.id, e.target.value as ValidationStatus)}
                    className="px-3 py-1.5 rounded-lg bg-paper border border-border font-bold text-xs text-charcoal focus:outline-none focus:border-terracotta"
                  >
                    <option value="Validated for Specified Use">Validated for Specified Use</option>
                    <option value="Testing In Progress">Testing In Progress</option>
                    <option value="Validation Pending">Validation Pending</option>
                    <option value="Not Tested">Not Tested</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
