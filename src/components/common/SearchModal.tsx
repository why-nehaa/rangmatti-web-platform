'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, X, Sparkles, ArrowRight, ShieldCheck, User, Package } from 'lucide-react';
import { sampleMaterials } from '@/data/materials';
import { sampleProducts } from '@/data/products';
import { sampleArtisans } from '@/data/artisans';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  // Keyboard shortcut Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingMaterials = trimmed
    ? sampleMaterials.filter(
        (m) =>
          m.name.toLowerCase().includes(trimmed) ||
          m.mineralSource.toLowerCase().includes(trimmed) ||
          m.color.toLowerCase().includes(trimmed) ||
          m.category.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingProducts = trimmed
    ? sampleProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(trimmed) ||
          p.artisanName.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.materialsUsed.some((mat) => mat.toLowerCase().includes(trimmed)) ||
          p.passportId.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingArtisans = trimmed
    ? sampleArtisans.filter(
        (a) =>
          a.name.toLowerCase().includes(trimmed) ||
          a.craft.toLowerCase().includes(trimmed) ||
          a.region.toLowerCase().includes(trimmed) ||
          a.tribe.toLowerCase().includes(trimmed)
      )
    : [];

  const hasResults =
    matchingMaterials.length > 0 || matchingProducts.length > 0 || matchingArtisans.length > 0;

  const handleSelect = (url: string) => {
    router.push(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-paper rounded-2xl shadow-2xl border border-border overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border bg-ivory-warm/40">
          <Search className="w-5 h-5 text-secondary mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pigments, Sohrai art, Dokra, artisans, batch IDs..."
            className="w-full bg-transparent text-sm sm:text-base text-charcoal placeholder-secondary/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-secondary hover:text-charcoal mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-clay-muted text-charcoal font-medium hover:bg-clay-muted/80"
          >
            ESC
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!trimmed ? (
            <div className="space-y-4 py-2">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-secondary mb-2">
                  Popular Queries
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Chiriya Red Ochre',
                    'Sohrai Canvas',
                    'Ghatsila Verdigris',
                    'Dokra Deer',
                    'Kaolin Bone White',
                    'RM-001-ART-007',
                    'Shanti Soren',
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-xs px-3 py-1.5 rounded-full bg-ivory-warm border border-border hover:border-terracotta hover:text-terracotta transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <p className="text-xs uppercase tracking-wider font-semibold text-secondary mb-2">
                  Browse by Category
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleSelect('/materials')}
                    className="p-2.5 rounded-lg bg-ivory-warm/70 hover:bg-clay-muted text-left font-medium flex items-center justify-between"
                  >
                    <span>Raw Mineral Pigments</span>
                    <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                  </button>
                  <button
                    onClick={() => handleSelect('/art')}
                    className="p-2.5 rounded-lg bg-ivory-warm/70 hover:bg-clay-muted text-left font-medium flex items-center justify-between"
                  >
                    <span>Tribal Paintings & Wall Murals</span>
                    <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                  </button>
                  <button
                    onClick={() => handleSelect('/collections/limited-collections')}
                    className="p-2.5 rounded-lg bg-ivory-warm/70 hover:bg-clay-muted text-left font-medium flex items-center justify-between"
                  >
                    <span>Dokra Lost-Wax Metal Art</span>
                    <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                  </button>
                  <button
                    onClick={() => handleSelect('/passport/RM-001-ART-007')}
                    className="p-2.5 rounded-lg bg-ivory-warm/70 hover:bg-clay-muted text-left font-medium flex items-center justify-between"
                  >
                    <span>Sample Digital Passport</span>
                    <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                  </button>
                </div>
              </div>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm font-medium text-charcoal">
                No matching materials, artworks, or artisans found for "{query}".
              </p>
              <p className="text-xs text-secondary max-w-sm mx-auto">
                Try searching for mineral terms like "ochre", "kaolin", craft traditions like "Sohrai", or browse our full collections.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleSelect('/materials')}
                  className="text-xs px-4 py-2 rounded-lg bg-terracotta text-paper font-semibold hover:bg-terracotta-deep transition-colors"
                >
                  Explore All Materials
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Materials */}
              {matchingMaterials.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-secondary mb-2 flex items-center">
                    <Package className="w-3.5 h-3.5 mr-1 text-terracotta" />
                    Creative Materials ({matchingMaterials.length})
                  </p>
                  <div className="space-y-1.5">
                    {matchingMaterials.map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => handleSelect(`/materials`)}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-ivory-warm text-left text-xs transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: mat.hexCode }}
                          />
                          <div>
                            <p className="font-semibold text-charcoal">{mat.name}</p>
                            <p className="text-[11px] text-secondary">{mat.mineralSource}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-terracotta">₹{mat.price}</span>
                          <span className="block text-[10px] text-forest font-medium">
                            {mat.validationStatus}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Artworks */}
              {matchingProducts.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-secondary mb-2 flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-terracotta" />
                    Artisan Creations ({matchingProducts.length})
                  </p>
                  <div className="space-y-1.5">
                    {matchingProducts.map((prd) => (
                      <button
                        key={prd.id}
                        onClick={() => handleSelect(`/product/${prd.slug}`)}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-ivory-warm text-left text-xs transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded bg-clay-muted overflow-hidden relative shrink-0">
                            <Image
                              src={prd.images[0]}
                              alt={prd.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-charcoal">{prd.title}</p>
                            <p className="text-[11px] text-secondary">
                              By {prd.artisanName} • Passport: {prd.passportId}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-charcoal">₹{prd.price}</span>
                          <span className="block text-[10px] text-terracotta font-medium">
                            View Art
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Artisans */}
              {matchingArtisans.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-secondary mb-2 flex items-center">
                    <User className="w-3.5 h-3.5 mr-1 text-terracotta" />
                    Tribal Artisans ({matchingArtisans.length})
                  </p>
                  <div className="space-y-1.5">
                    {matchingArtisans.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => handleSelect(`/artisans/${art.slug}`)}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-ivory-warm text-left text-xs transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-sand/30 flex items-center justify-center font-bold text-xs text-charcoal shrink-0">
                            {art.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-charcoal">{art.name}</p>
                            <p className="text-[11px] text-secondary">
                              {art.craft} • {art.region}
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] text-terracotta font-medium">
                          View Profile →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-ivory-warm border-t border-border flex items-center justify-between text-[11px] text-secondary">
          <span>Search RangMitti Verified Mineral Products & Artworks</span>
          <span>Tip: Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
