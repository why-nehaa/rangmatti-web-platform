'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { sampleProducts } from '@/data/products';
import { sampleMaterials } from '@/data/materials';
import { Heart, ShoppingBag, ArrowRight, ShieldCheck, QrCode, Sparkles } from 'lucide-react';

export default function FeaturedProductsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'art' | 'materials'>('all');
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const handleAddToCart = (item: any, type: 'material' | 'artwork') => {
    addToCart({
      id: item.id,
      type,
      name: item.title || item.name,
      slug: item.slug,
      price: item.price,
      image: item.images ? item.images[0] : item.image,
      maxStock: item.stock,
      sellerName: item.artisanName || item.seller.name,
      passportId: item.passportId,
    });
    setAddedNotice(item.title || item.name);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  const displayArt = sampleProducts.slice(0, 3);
  const displayMaterials = sampleMaterials.slice(0, 3);

  return (
    <section className="py-20 bg-paper border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-terracotta">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Creations & Pigments</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Featured from the Marketplace
            </h2>
            <p className="text-sm text-secondary max-w-xl">
              Authentic artworks crafted by Jharkhand master creators, alongside standardized, safety-screened mineral creative materials.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-ivory-warm border border-border self-start">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-paper text-terracotta shadow-sm'
                  : 'text-secondary hover:text-charcoal'
              }`}
            >
              All Featured
            </button>
            <button
              onClick={() => setActiveTab('art')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'art'
                  ? 'bg-paper text-terracotta shadow-sm'
                  : 'text-secondary hover:text-charcoal'
              }`}
            >
              Art & Murals
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'materials'
                  ? 'bg-paper text-terracotta shadow-sm'
                  : 'text-secondary hover:text-charcoal'
              }`}
            >
              Raw Materials
            </button>
          </div>
        </div>

        {/* Temporary added alert */}
        {addedNotice && (
          <div className="mb-6 p-3 rounded-xl bg-forest/10 border border-forest/20 text-forest text-xs font-semibold flex items-center justify-between animate-in fade-in">
            <span>✓ Added "{addedNotice}" to your shopping cart!</span>
            <Link href="/cart" className="underline font-bold">
              View Cart →
            </Link>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Artisan Artworks */}
          {(activeTab === 'all' || activeTab === 'art') &&
            displayArt.map((product) => {
              const inWishlist = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group rounded-2xl bg-ivory-warm/60 border border-border overflow-hidden hover:border-sand hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative">
                    {/* Image Container */}
                    <div className="relative h-64 w-full bg-clay-muted overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Wishlist Button */}
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

                      {/* Passport Tag */}
                      <Link
                        href={`/passport/${product.passportId}`}
                        className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-paper/90 backdrop-blur-md text-[10px] font-bold text-charcoal border border-border flex items-center gap-1 hover:bg-paper hover:text-terracotta transition-colors"
                      >
                        <QrCode className="w-3 h-3 text-terracotta" />
                        <span>Passport: {product.passportId}</span>
                      </Link>
                    </div>

                    {/* Details */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-secondary">
                        <span>{product.category}</span>
                        <span className="text-forest font-semibold">{product.stock} available</span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors line-clamp-1">
                        <Link href={`/product/${product.slug}`}>{product.title}</Link>
                      </h3>

                      <p className="text-xs text-secondary">
                        By <span className="font-semibold text-charcoal">{product.artisanName}</span> ({product.artisanRegion})
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-border/70">
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
                          Handmade
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-5 pb-5 pt-1 grid grid-cols-2 gap-2">
                    <Link
                      href={`/product/${product.slug}`}
                      className="py-2.5 px-3 rounded-lg border border-border text-center text-xs font-semibold text-charcoal hover:bg-paper hover:border-charcoal transition-colors"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product, 'artwork')}
                      className="py-2.5 px-3 rounded-lg bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}

          {/* Raw Materials */}
          {(activeTab === 'all' || activeTab === 'materials') &&
            displayMaterials.map((material) => {
              const inWishlist = isInWishlist(material.id);
              return (
                <div
                  key={material.id}
                  className="group rounded-2xl bg-ivory-warm/60 border border-border overflow-hidden hover:border-sand hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative">
                    {/* Image / Color Visual Container */}
                    <div className="relative h-64 w-full bg-clay-muted overflow-hidden">
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

                      {/* Validation Status Pill */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-forest text-paper text-[10px] font-bold shadow-md flex items-center gap-1">
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

                    {/* Details */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-secondary">
                        <span>{material.category}</span>
                        <span>{material.packSizes[0]}</span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors line-clamp-1">
                        <Link href="/materials">{material.name}</Link>
                      </h3>

                      <p className="text-xs text-secondary line-clamp-1">
                        Source: {material.mineralSource}
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-border/70">
                        <div className="flex items-baseline space-x-2">
                          <span className="font-serif text-xl font-bold text-charcoal">
                            ₹{material.price.toLocaleString('en-IN')}
                          </span>
                          {material.originalPrice && (
                            <span className="text-xs text-secondary line-through">
                              ₹{material.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] px-2 py-0.5 rounded bg-forest/10 text-forest font-semibold">
                          Batch RM-2026
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-5 pb-5 pt-1 grid grid-cols-2 gap-2">
                    <Link
                      href="/materials"
                      className="py-2.5 px-3 rounded-lg border border-border text-center text-xs font-semibold text-charcoal hover:bg-paper hover:border-charcoal transition-colors"
                    >
                      Lab Specs
                    </Link>
                    <button
                      onClick={() => handleAddToCart(material, 'material')}
                      className="py-2.5 px-3 rounded-lg bg-forest hover:bg-forest-deep text-paper text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        {/* View All Links Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-secondary">
            Every product supports verified artisan livelihoods and traceable mineral innovation.
          </p>

          <div className="flex items-center space-x-4 text-xs font-semibold">
            <Link
              href="/art"
              className="text-terracotta hover:underline flex items-center"
            >
              Browse All Originals ({sampleProducts.length}) →
            </Link>
            <span className="text-border">|</span>
            <Link
              href="/materials"
              className="text-forest hover:underline flex items-center"
            >
              Browse All Materials ({sampleMaterials.length}) →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
