'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { sampleProducts } from '@/data/products';
import { sampleMaterials } from '@/data/materials';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  // Find wishlist items from sample products and materials
  const savedArt = sampleProducts.filter((p) => wishlist.includes(p.id));
  const savedMaterials = sampleMaterials.filter((m) => wishlist.includes(m.id));

  const totalSaved = savedArt.length + savedMaterials.length;

  const handleMoveToCart = (item: any, type: 'artwork' | 'material') => {
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
    toggleWishlist(item.id);
  };

  return (
    <div className="bg-ivory-warm min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-border">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              My Saved Wishlist
            </h1>
            <p className="text-xs text-secondary mt-1">
              {totalSaved} items saved for future consideration
            </p>
          </div>

          <Link
            href="/art"
            className="text-xs font-semibold text-terracotta hover:underline flex items-center"
          >
            <span>Continue Browsing</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {totalSaved === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl bg-paper border border-border shadow-sm max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-sand/20 flex items-center justify-center mx-auto text-terracotta">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-secondary leading-relaxed max-w-sm mx-auto">
              Explore our curated tribal artworks or standardized mineral pigments and save your favorite pieces here.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/art"
                className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold transition-all shadow-sm"
              >
                Browse Tribal Art
              </Link>
              <Link
                href="/materials"
                className="px-5 py-2.5 rounded-xl bg-paper border border-border hover:border-forest text-forest text-xs font-semibold transition-all"
              >
                Explore Materials
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Artworks */}
            {savedArt.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl bg-paper border border-border overflow-hidden hover:border-sand hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full bg-clay-muted">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-paper/80 hover:bg-paper text-terracotta transition-colors"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-terracotta">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-charcoal line-clamp-1">
                      <Link href={`/product/${product.slug}`}>{product.title}</Link>
                    </h3>
                    <p className="text-xs text-secondary">
                      By {product.artisanName} ({product.artisanRegion})
                    </p>
                    <div className="pt-2 flex items-center justify-between border-t border-border">
                      <span className="font-serif text-xl font-bold text-charcoal">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-forest font-semibold">
                        {product.stock} In Stock
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="py-2.5 rounded-lg border border-border text-xs font-semibold text-secondary hover:text-charcoal transition-colors"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleMoveToCart(product, 'artwork')}
                    className="py-2.5 rounded-lg bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}

            {/* Materials */}
            {savedMaterials.map((material) => (
              <div
                key={material.id}
                className="rounded-2xl bg-paper border border-border overflow-hidden hover:border-sand hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full bg-clay-muted">
                    <Image
                      src={material.image}
                      alt={material.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => toggleWishlist(material.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-paper/80 hover:bg-paper text-terracotta transition-colors"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-forest">
                      {material.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-charcoal line-clamp-1">
                      {material.name}
                    </h3>
                    <p className="text-xs text-secondary line-clamp-1">
                      {material.mineralSource}
                    </p>
                    <div className="pt-2 flex items-center justify-between border-t border-border">
                      <span className="font-serif text-xl font-bold text-charcoal">
                        ₹{material.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-forest font-semibold">
                        {material.packSizes[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => toggleWishlist(material.id)}
                    className="py-2.5 rounded-lg border border-border text-xs font-semibold text-secondary hover:text-charcoal transition-colors"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleMoveToCart(material, 'material')}
                    className="py-2.5 rounded-lg bg-forest hover:bg-forest-deep text-paper text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
