'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { sampleMaterials } from '@/data/materials';
import { MaterialItem, ValidationStatus } from '@/types';
import { 
  Filter, 
  Grid, 
  List, 
  Search, 
  ShieldCheck, 
  Heart, 
  ShoppingBag, 
  X, 
  FileText, 
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';

export default function MaterialsPage() {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Preview Modal
  const [previewMaterial, setPreviewMaterial] = useState<MaterialItem | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = ['All', 'Raw Pigment Powder', 'Processed Slurry', 'Fine Aggregate', 'Ceramic Wash'];
  const colors = ['All', 'Terracotta Red', 'Forest Verdigris', 'Kaolin Bone White', 'Graphite Charcoal', 'Golden Sand', 'Muted Clay'];
  const statuses = ['All', 'Validated for Specified Use', 'Testing In Progress'];

  // Filtering and sorting
  const filteredMaterials = useMemo(() => {
    return sampleMaterials
      .filter((mat) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = mat.name.toLowerCase().includes(q);
          const matchSource = mat.mineralSource.toLowerCase().includes(q);
          const matchColor = mat.color.toLowerCase().includes(q);
          if (!matchName && !matchSource && !matchColor) return false;
        }
        if (selectedCategory !== 'All' && mat.category !== selectedCategory) return false;
        if (selectedColor !== 'All' && mat.color !== selectedColor) return false;
        if (selectedStatus !== 'All' && mat.validationStatus !== selectedStatus) return false;
        if (mat.price > maxPrice) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'stock') return b.stock - a.stock;
        return 0; // relevance
      });
  }, [searchQuery, selectedCategory, selectedColor, selectedStatus, maxPrice, sortBy]);

  const handleAdd = (material: MaterialItem) => {
    addToCart({
      id: material.id,
      type: 'material',
      name: material.name,
      slug: material.slug,
      price: material.price,
      image: material.image,
      maxStock: material.stock,
      sellerName: material.seller.name,
      selectedVariant: material.packSizes[0],
    });
    setAddedNotice(material.name);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedColor('All');
    setSelectedStatus('All');
    setMaxPrice(600);
    setSortBy('relevance');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'All' ||
    selectedColor !== 'All' ||
    selectedStatus !== 'All' ||
    maxPrice < 600;

  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner */}
        <div className="mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Characterized & Safety Screened</span>
            <span className="opacity-40">•</span>
            <span>West Singhbhum & East Singhbhum Streams</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
            RangMitti Materials
          </h1>

          <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
            Standardized creative materials recovered from suitable mineral by-products and beneficiation streams. Each batch is subjected to heavy metal leachability testing (EPA 1311 TCLP) and formulated for artists, studios, and eco-designers.
          </p>

          <div className="p-3 rounded-xl bg-paper/80 border border-sand/60 text-xs text-secondary flex items-start gap-2 max-w-2xl">
            <Info className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
            <span>
              <strong>Validation Notice:</strong> "Validated for Specified Use" indicates compliance with non-toxic art and craft safety thresholds under our pilot protocol. Not approved for ingestion or cosmetics.
            </span>
          </div>
        </div>

        {/* Temporary Added Alert */}
        {addedNotice && (
          <div className="mb-6 p-3 rounded-xl bg-forest/15 border border-forest/30 text-forest text-xs font-semibold flex items-center justify-between animate-in fade-in">
            <span>✓ Added "{addedNotice}" to your shopping cart!</span>
            <Link href="/cart" className="underline font-bold">
              View Cart →
            </Link>
          </div>
        )}

        {/* Main Grid: Filters Sidebar + Material Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Column */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="p-5 rounded-2xl bg-paper border border-border shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="font-serif text-base font-bold text-charcoal flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-terracotta" />
                  Filter Materials
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-terracotta font-semibold hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Search Within */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">
                  Search by Mineral or Name
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-secondary absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Iron Ochre, Kaolin, Chiriya"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-ivory-warm border border-border text-xs focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">
                  Material Form
                </label>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-clay-muted text-charcoal font-bold'
                          : 'text-secondary hover:text-charcoal hover:bg-ivory-warm'
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <span className="text-terracotta">●</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Earth Color Filter */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">
                  Mineral Hue
                </label>
                <div className="space-y-1">
                  {colors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between ${
                        selectedColor === col
                          ? 'bg-clay-muted text-charcoal font-bold'
                          : 'text-secondary hover:text-charcoal hover:bg-ivory-warm'
                      }`}
                    >
                      <span>{col}</span>
                      {selectedColor === col && <span className="text-terracotta">●</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Validation Status Filter */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">
                  Validation Status
                </label>
                <div className="space-y-1">
                  {statuses.map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStatus(st)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between ${
                        selectedStatus === st
                          ? 'bg-forest/15 text-forest font-bold'
                          : 'text-secondary hover:text-charcoal hover:bg-ivory-warm'
                      }`}
                    >
                      <span className="truncate">{st}</span>
                      {selectedStatus === st && <span className="text-forest">●</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Range */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-charcoal mb-1.5">
                  <span>Max Price</span>
                  <span className="text-terracotta">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="600"
                  step="20"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-terracotta cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-secondary mt-1">
                  <span>₹150</span>
                  <span>₹600</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Column */}
          <main className="lg:col-span-3 space-y-6">
            {/* Controls Bar */}
            <div className="p-4 rounded-xl bg-paper border border-border flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-secondary">
                Showing <strong className="text-charcoal">{filteredMaterials.length}</strong> of{' '}
                {sampleMaterials.length} creative materials
              </span>

              <div className="flex items-center space-x-3">
                {/* Sort Dropdown */}
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-secondary font-medium">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-ivory-warm border border-border text-xs font-medium text-charcoal focus:outline-none"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="stock">Highest Stock</option>
                  </select>
                </div>

                {/* View Switcher */}
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 ${viewMode === 'grid' ? 'bg-clay-muted text-charcoal' : 'text-secondary hover:bg-ivory-warm'}`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 ${viewMode === 'list' ? 'bg-clay-muted text-charcoal' : 'text-secondary hover:bg-ivory-warm'}`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredMaterials.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl bg-paper border border-border space-y-3">
                <AlertCircle className="w-10 h-10 text-sand-dark mx-auto" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  No materials match your active filters
                </h3>
                <p className="text-xs text-secondary max-w-sm mx-auto">
                  Try adjusting the maximum price or clear some filters to view our full mineral catalog.
                </p>
                <div className="pt-2">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 rounded-lg bg-terracotta text-paper text-xs font-semibold hover:bg-terracotta-deep"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map((material) => {
                  const inWishlist = isInWishlist(material.id);
                  return (
                    <div
                      key={material.id}
                      className="group rounded-2xl bg-paper border border-border overflow-hidden hover:border-sand hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="relative">
                        <div className="relative h-56 w-full bg-clay-muted overflow-hidden">
                          <Image
                            src={material.image}
                            alt={material.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Wishlist Button */}
                          <button
                            onClick={() => toggleWishlist(material.id)}
                            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                              inWishlist
                                ? 'bg-terracotta text-paper'
                                : 'bg-paper/80 text-charcoal hover:bg-paper hover:text-terracotta'
                            }`}
                            title="Add to Wishlist"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>

                          {/* Validation Badge */}
                          <div
                            className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1 ${
                              material.validationStatus === 'Validated for Specified Use'
                                ? 'bg-forest text-paper'
                                : 'bg-sand-dark text-paper'
                            }`}
                          >
                            <ShieldCheck className="w-3 h-3" />
                            <span>{material.validationStatus}</span>
                          </div>

                          {/* Color Swatch Dot */}
                          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-paper/90 backdrop-blur-md text-[10px] font-bold text-charcoal border border-border flex items-center gap-1.5">
                            <span
                              className="w-3 h-3 rounded-full border border-black/20"
                              style={{ backgroundColor: material.hexCode }}
                            />
                            <span>{material.color}</span>
                          </div>
                        </div>

                        <div className="p-5 space-y-2">
                          <div className="flex items-center justify-between text-[11px] text-secondary">
                            <span>{material.category}</span>
                            <span className="font-mono">{material.particleSize.split(' ')[0]}</span>
                          </div>

                          <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors line-clamp-1">
                            {material.name}
                          </h3>

                          <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                            {material.description}
                          </p>

                          <div className="pt-2 flex items-center justify-between border-t border-border">
                            <div className="flex items-baseline space-x-2">
                              <span className="font-serif text-xl font-bold text-charcoal">
                                ₹{material.price}
                              </span>
                              {material.originalPrice && (
                                <span className="text-xs text-secondary line-through">
                                  ₹{material.originalPrice}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-secondary font-medium">
                              {material.packSizes[0]}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="px-5 pb-5 pt-1 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setPreviewMaterial(material)}
                          className="py-2.5 px-3 rounded-lg border border-border text-center text-xs font-semibold text-charcoal hover:bg-ivory-warm transition-colors flex items-center justify-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5 text-secondary" />
                          Lab Specs
                        </button>
                        <button
                          onClick={() => handleAdd(material)}
                          className="py-2.5 px-3 rounded-lg bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredMaterials.map((material) => {
                  const inWishlist = isInWishlist(material.id);
                  return (
                    <div
                      key={material.id}
                      className="group rounded-2xl bg-paper border border-border p-4 hover:border-sand hover:shadow-lg transition-all flex flex-col sm:flex-row gap-5 items-center justify-between"
                    >
                      <div className="flex items-center space-x-4 w-full sm:w-auto">
                        <div className="relative h-24 w-24 rounded-xl bg-clay-muted overflow-hidden shrink-0">
                          <Image
                            src={material.image}
                            alt={material.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-full border border-black/20"
                              style={{ backgroundColor: material.hexCode }}
                            />
                            <span className="text-[10px] font-bold text-forest uppercase">
                              {material.validationStatus}
                            </span>
                          </div>
                          <h3 className="font-serif text-base font-bold text-charcoal">
                            {material.name}
                          </h3>
                          <p className="text-xs text-secondary line-clamp-1">
                            {material.mineralSource}
                          </p>
                          <p className="text-[11px] text-secondary">
                            Particle Size: {material.particleSize} • Pack: {material.packSizes[0]}
                          </p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-border">
                        <span className="font-serif text-xl font-bold text-charcoal">
                          ₹{material.price}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setPreviewMaterial(material)}
                            className="p-2 rounded-lg border border-border text-xs font-semibold hover:bg-ivory-warm"
                            title="Inspect Test Certificate"
                          >
                            <FileText className="w-4 h-4 text-secondary" />
                          </button>
                          <button
                            onClick={() => handleAdd(material)}
                            className="px-4 py-2 rounded-lg bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold flex items-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Lab Parameters Quick Preview Modal */}
      {previewMaterial && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-paper rounded-2xl border border-sand shadow-2xl p-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <span
                  className="w-5 h-5 rounded-full border border-black/20"
                  style={{ backgroundColor: previewMaterial.hexCode }}
                />
                <div>
                  <h3 className="font-serif text-lg font-bold text-charcoal">
                    {previewMaterial.name}
                  </h3>
                  <p className="text-xs text-secondary font-mono">
                    Batch: {previewMaterial.labTestSummary.batchNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewMaterial(null)}
                className="p-1 rounded-md text-secondary hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-ivory-warm border border-border space-y-1">
                <p className="font-bold text-charcoal">Characterization & Testing Facility:</p>
                <p className="text-secondary">{previewMaterial.labTestSummary.labName}</p>
                <p className="text-[11px] text-secondary">
                  Test Date: {previewMaterial.labTestSummary.testDate} • Reviewer: {previewMaterial.labTestSummary.reviewer}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-charcoal uppercase tracking-wider text-[11px] mb-2">
                  Key Chemical & Physical Screening Parameters
                </h4>
                <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
                  {previewMaterial.labTestSummary.parameters.map((param, i) => (
                    <div key={i} className="p-2.5 flex items-center justify-between bg-paper">
                      <span className="font-medium text-charcoal">{param.name}</span>
                      <span className="font-mono text-forest font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {param.result}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-charcoal">Intended & Approved Applications:</p>
                <p className="text-secondary leading-relaxed">{previewMaterial.intendedUse}</p>
              </div>

              <div className="p-3 rounded-lg bg-sand/20 border border-sand/40 space-y-1">
                <p className="font-bold text-charcoal text-[11px]">Usage Restrictions & Safety Note:</p>
                <p className="text-secondary leading-relaxed">{previewMaterial.limitations}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="font-serif text-xl font-bold text-charcoal">
                ₹{previewMaterial.price}
              </span>
              <button
                onClick={() => {
                  handleAdd(previewMaterial);
                  setPreviewMaterial(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
