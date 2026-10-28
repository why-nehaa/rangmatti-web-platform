'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { sampleProducts } from '@/data/products';
import { sampleArtisans } from '@/data/artisans';
import { ArtisanProduct } from '@/types';
import { 
  Filter, 
  Search, 
  Heart, 
  ShoppingBag, 
  QrCode, 
  Sparkles, 
  Eye, 
  X, 
  AlertCircle,
  MapPin,
  Check
} from 'lucide-react';

export default function ArtMarketplacePage() {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedArtisan, setSelectedArtisan] = useState<string>('All');
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(7500);
  const [sortBy, setSortBy] = useState<string>('relevance');

  // Quick view modal
  const [quickViewProduct, setQuickViewProduct] = useState<ArtisanProduct | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = [
    'All',
    'Paintings & Wall Art',
    'Dokra Metal & Mineral Fusion',
    'Terracotta Decor',
    'Handcrafted Paper Art',
    'Ceramic Vessels',
  ];

  const collections = [
    'All',
    'RangMitti Originals',
    'Earth & Colour',
    'Artisan Stories',
    'Limited Collections',
    'Corporate Gifting',
  ];

  const filteredProducts = useMemo(() => {
    return sampleProducts
      .filter((prd) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = prd.title.toLowerCase().includes(q);
          const matchArtisan = prd.artisanName.toLowerCase().includes(q);
          const matchStory = prd.story.toLowerCase().includes(q);
          const matchId = prd.passportId.toLowerCase().includes(q);
          if (!matchTitle && !matchArtisan && !matchStory && !matchId) return false;
        }
        if (selectedCategory !== 'All' && prd.category !== selectedCategory) return false;
        if (selectedArtisan !== 'All' && prd.artisanName !== selectedArtisan) return false;
        if (selectedCollection !== 'All' && prd.collection !== selectedCollection) return false;
        if (prd.price > maxPrice) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0; // relevance
      });
  }, [searchQuery, selectedCategory, selectedArtisan, selectedCollection, maxPrice, sortBy]);

  const handleAddToCart = (product: ArtisanProduct) => {
    addToCart({
      id: product.id,
      type: 'artwork',
      name: product.title,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      maxStock: product.stock,
      sellerName: product.artisanName,
      passportId: product.passportId,
    });
    setAddedNotice(product.title);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedArtisan('All');
    setSelectedCollection('All');
    setMaxPrice(7500);
    setSortBy('relevance');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'All' ||
    selectedArtisan !== 'All' ||
    selectedCollection !== 'All' ||
    maxPrice < 7500;

  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sand/30 border border-sand text-charcoal text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Indigenous Tribal Craft & Living Heritage</span>
            <span className="opacity-40">•</span>
            <span>West Singhbhum & Kolhan Artisans</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
            RangMitti Originals
          </h1>

          <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
            Authentic tribal paintings, Sohrai and Khovar mural panels, Dokra lost-wax bronze sculptures, and pit-fired stoneware pottery created with verified local mineral pigments. Every work is permanently catalogued with its own Digital Passport.
          </p>
        </div>

        {/* Temporary added notice */}
        {addedNotice && (
          <div className="mb-6 p-3 rounded-xl bg-forest/15 border border-forest/30 text-forest text-xs font-semibold flex items-center justify-between animate-in fade-in">
            <span>✓ Added "{addedNotice}" to your shopping cart!</span>
            <Link href="/cart" className="underline font-bold">
              View Cart →
            </Link>
          </div>
        )}

        {/* Layout: Filters Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="p-5 rounded-2xl bg-paper border border-border shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="font-serif text-base font-bold text-charcoal flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-terracotta" />
                  Filter Artworks
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
                  Search Art or Passport ID
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-secondary absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Sohrai, Deer, RM-001"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-ivory-warm border border-border text-xs focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Craft Category */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">
                  Medium & Category
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
                      <span className="truncate">{cat}</span>
                      {selectedCategory === cat && <span className="text-terracotta">●</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter by Artisan */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">
                  Master Creator
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedArtisan('All')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between ${
                      selectedArtisan === 'All'
                        ? 'bg-clay-muted text-charcoal font-bold'
                        : 'text-secondary hover:text-charcoal hover:bg-ivory-warm'
                    }`}
                  >
                    <span>All Artisans</span>
                    {selectedArtisan === 'All' && <span className="text-terracotta">●</span>}
                  </button>
                  {sampleArtisans.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => setSelectedArtisan(art.name)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between ${
                        selectedArtisan === art.name
                          ? 'bg-clay-muted text-charcoal font-bold'
                          : 'text-secondary hover:text-charcoal hover:bg-ivory-warm'
                      }`}
                    >
                      <span className="truncate">{art.name.split(' (')[0]}</span>
                      {selectedArtisan === art.name && <span className="text-terracotta">●</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Curated Collection */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">
                  Collection
                </label>
                <div className="space-y-1">
                  {collections.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedCollection(col)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between ${
                        selectedCollection === col
                          ? 'bg-clay-muted text-charcoal font-bold'
                          : 'text-secondary hover:text-charcoal hover:bg-ivory-warm'
                      }`}
                    >
                      <span>{col}</span>
                      {selectedCollection === col && <span className="text-terracotta">●</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-charcoal mb-1.5">
                  <span>Max Price</span>
                  <span className="text-terracotta">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="7500"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-terracotta cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-secondary mt-1">
                  <span>₹2,000</span>
                  <span>₹7,500</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Main */}
          <main className="lg:col-span-3 space-y-6">
            <div className="p-4 rounded-xl bg-paper border border-border flex items-center justify-between">
              <span className="text-xs text-secondary">
                Showing <strong className="text-charcoal">{filteredProducts.length}</strong> of{' '}
                {sampleProducts.length} artworks
              </span>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-secondary font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-ivory-warm border border-border text-xs font-medium text-charcoal focus:outline-none"
                >
                  <option value="relevance">Featured & Relevant</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl bg-paper border border-border space-y-3">
                <AlertCircle className="w-10 h-10 text-sand-dark mx-auto" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  No artworks found matching your criteria
                </h3>
                <p className="text-xs text-secondary max-w-sm mx-auto">
                  Try widening your price range or reset your category and artisan filters.
                </p>
                <div className="pt-2">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 rounded-lg bg-terracotta text-paper text-xs font-semibold hover:bg-terracotta-deep"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            ) : (
              /* Product Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const inWishlist = isInWishlist(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group rounded-2xl bg-paper border border-border overflow-hidden hover:border-sand hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="relative">
                        <div className="relative h-64 w-full bg-clay-muted overflow-hidden">
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Wishlist */}
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                              inWishlist
                                ? 'bg-terracotta text-paper'
                                : 'bg-paper/80 text-charcoal hover:bg-paper hover:text-terracotta'
                            }`}
                            title="Add to Wishlist"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>

                          {/* Quick View Button */}
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            className="absolute top-3 left-3 p-2 rounded-full bg-paper/80 backdrop-blur-md text-charcoal hover:bg-paper hover:text-terracotta transition-colors opacity-0 group-hover:opacity-100"
                            title="Quick View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Passport Link Pill */}
                          <Link
                            href={`/passport/${product.passportId}`}
                            className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-paper/90 backdrop-blur-md text-[10px] font-bold text-charcoal border border-border flex items-center gap-1 hover:bg-paper hover:text-terracotta transition-colors shadow-sm"
                          >
                            <QrCode className="w-3 h-3 text-terracotta" />
                            <span>Passport: {product.passportId}</span>
                          </Link>
                        </div>

                        {/* Details */}
                        <div className="p-5 space-y-2">
                          <div className="flex items-center justify-between text-[11px] text-secondary">
                            <span>{product.category}</span>
                            <span className="text-forest font-semibold">
                              {product.stock} in stock
                            </span>
                          </div>

                          <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors line-clamp-1">
                            <Link href={`/product/${product.slug}`}>{product.title}</Link>
                          </h3>

                          <div className="flex items-center text-xs text-secondary">
                            <MapPin className="w-3.5 h-3.5 mr-1 text-terracotta shrink-0" />
                            <span className="truncate">
                              By <strong className="text-charcoal">{product.artisanName}</strong>
                            </span>
                          </div>

                          <p className="text-xs text-secondary line-clamp-2 leading-relaxed pt-1">
                            {product.story}
                          </p>

                          <div className="pt-2 flex items-center justify-between border-t border-border">
                            <div className="flex items-baseline space-x-2">
                              <span className="font-serif text-xl font-bold text-charcoal">
                                ₹{product.price.toLocaleString('en-IN')}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-secondary line-through">
                                  ₹{product.originalPrice.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-sand/30 text-charcoal font-medium">
                              {product.dimensions.split(' ')[0]}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="px-5 pb-5 pt-1 grid grid-cols-2 gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          className="py-2.5 px-3 rounded-lg border border-border text-center text-xs font-semibold text-charcoal hover:bg-ivory-warm transition-colors"
                        >
                          Story & Specs
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product)}
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
            )}
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-paper rounded-2xl border border-sand shadow-2xl p-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-bold text-terracotta uppercase tracking-wider">
                Quick Artwork Inspection
              </span>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="p-1 rounded-md text-secondary hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden bg-clay-muted">
                <Image
                  src={quickViewProduct.images[0]}
                  alt={quickViewProduct.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] text-secondary">{quickViewProduct.category}</span>
                  <h3 className="font-serif text-2xl font-bold text-charcoal">
                    {quickViewProduct.title}
                  </h3>
                  <p className="text-xs text-secondary mt-1">
                    Master Creator: <strong className="text-charcoal">{quickViewProduct.artisanName}</strong> ({quickViewProduct.artisanRegion})
                  </p>
                </div>

                <p className="text-xs text-secondary leading-relaxed">
                  {quickViewProduct.story}
                </p>

                <div className="p-3 rounded-xl bg-ivory-warm border border-border text-xs space-y-1">
                  <p className="font-semibold text-charcoal">Materials & Minerals Used:</p>
                  <ul className="list-disc list-inside text-secondary text-[11px] space-y-0.5">
                    {quickViewProduct.materialsUsed.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-serif text-2xl font-bold text-charcoal">
                    ₹{quickViewProduct.price.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                  <Link
                    href={`/product/${quickViewProduct.slug}`}
                    className="text-terracotta hover:underline font-semibold"
                  >
                    View Full Product Page →
                  </Link>
                  <Link
                    href={`/passport/${quickViewProduct.passportId}`}
                    className="text-forest hover:underline font-semibold flex items-center gap-1"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    View Passport
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
