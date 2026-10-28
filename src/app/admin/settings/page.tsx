'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Sparkles, Check } from 'lucide-react';

export default function AdminSettingsPage() {
  const [announcement, setAnnouncement] = useState('Rooted in Jharkhand. Designed for creative possibilities.');
  const [pilotMode, setPilotMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Platform & Banner Settings
            </h1>
            <p className="text-xs text-secondary mt-1">
              Configure global parameters, homepage announcement strip, and presentation notices
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

        {saved && (
          <div className="p-3.5 rounded-xl bg-forest/15 border border-forest/30 text-forest text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Platform settings successfully saved!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="p-8 rounded-3xl bg-paper border border-border shadow-sm space-y-6 text-xs">
          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-2">
              Top Announcement Strip Copy
            </label>
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-ivory-warm border border-border text-charcoal font-medium focus:outline-none focus:border-terracotta"
            />
            <p className="text-[11px] text-secondary mt-1">
              Displays across all pages at the top of the viewport.
            </p>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <label className="block font-bold text-charcoal uppercase tracking-wider">
              Idea Tribe 2026 Presentation Configuration
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={pilotMode}
                onChange={(e) => setPilotMode(e.target.checked)}
                className="accent-terracotta w-4 h-4"
              />
              <div>
                <span className="font-semibold text-charcoal block">Demonstration Pilot Badge Active</span>
                <span className="text-secondary text-[11px]">
                  Clearly identifies unverified scientific claims or mock payment gateways as simulated competition demonstration features.
                </span>
              </div>
            </label>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper font-semibold shadow-sm flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Platform Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
