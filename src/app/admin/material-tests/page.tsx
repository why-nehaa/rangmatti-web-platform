'use client';

import React from 'react';
import Link from 'next/link';
import { sampleMaterials } from '@/data/materials';
import { ArrowLeft, FlaskConical, ShieldCheck, FileText } from 'lucide-react';

export default function AdminMaterialTestsPage() {
  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Laboratory Characterization Records
            </h1>
            <p className="text-xs text-secondary mt-1">
              EPA 1311 TCLP leaching assays, ASTM D4303 lightfastness, and elemental screens
            </p>
          </div>
          <Link
            href="/admin/materials"
            className="text-xs font-semibold text-secondary hover:text-terracotta flex items-center"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Material Streams
          </Link>
        </div>

        <div className="space-y-6">
          {sampleMaterials.map((mat) => {
            const test = mat.labTestSummary;
            return (
              <div
                key={mat.id}
                className="p-6 rounded-3xl bg-paper border border-border shadow-sm space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-border gap-2">
                  <div className="flex items-center space-x-3">
                    <span
                      className="w-4 h-4 rounded-full border border-black/20"
                      style={{ backgroundColor: mat.hexCode }}
                    />
                    <div>
                      <h2 className="font-serif text-lg font-bold text-charcoal">{mat.name}</h2>
                      <p className="text-xs text-secondary font-mono">
                        Batch No: <strong className="text-terracotta">{test.batchNumber}</strong> • Source: {mat.mineralSource}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      mat.validationStatus === 'Validated for Specified Use'
                        ? 'bg-forest/15 text-forest'
                        : 'bg-sand/30 text-sand-dark'
                    }`}
                  >
                    {mat.validationStatus}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-ivory-warm border border-border space-y-1">
                    <p className="font-semibold text-charcoal">Characterization Protocol & Facility:</p>
                    <p className="text-secondary">{test.labName}</p>
                    <p className="text-[11px] text-secondary">
                      Date Conducted: {test.testDate} • Audited by: {test.reviewer}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-ivory-warm border border-border space-y-1">
                    <p className="font-semibold text-charcoal">Audit Scope:</p>
                    <p className="text-secondary leading-relaxed">{test.scope}</p>
                  </div>
                </div>

                {/* Parameters Table */}
                <div>
                  <h4 className="text-[11px] uppercase font-bold tracking-wider text-charcoal mb-2">
                    Tested Parameters & Regulatory Outcomes
                  </h4>
                  <div className="divide-y divide-border border border-border rounded-xl overflow-hidden text-xs">
                    {test.parameters.map((param, i) => (
                      <div key={i} className="p-2.5 flex items-center justify-between bg-paper">
                        <span className="font-medium text-charcoal">{param.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-secondary">{param.result}</span>
                          {param.passed ? (
                            <span className="px-2 py-0.5 rounded bg-forest/15 text-forest font-bold text-[10px]">
                              PASS
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-sand/30 text-sand-dark font-bold text-[10px]">
                              PENDING
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sand/20 border border-sand/40 text-xs text-charcoal space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-terracotta" />
                    Pilot Protocol Attestation:
                  </p>
                  <p className="text-secondary leading-relaxed text-[11px]">
                    {test.certificateNote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
