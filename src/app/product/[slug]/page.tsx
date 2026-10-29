'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { sampleProducts } from '@/data/products';
import { sampleArtisans } from '@/data/artisans';
import ProductPassportModal from '@/components/passport/ProductPassportModal';
import { 
  Heart, 
  ShoppingBag, 
  QrCode, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Share2, 
  Check, 
  MapPin, 
  Sparkles,
  Layers,
  ArrowRight,
  Smartphone
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = sampleProducts.find((p) => p.slug === slug);

  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [showPassportModal, setShowPassportModal] = useState(false);

  if (!product) {
    notFound();
  }

  const artisan = sampleArtisans.find((a) => a.id === product.artisanId);
  const relatedProducts = sampleProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        type: 'artwork',
        name: product.title,
        slug: product.slug,
        price: product.price,
        image: product.images[0],
        maxStock: product.stock,
        sellerName: product.artisanName,
        passportId: product.passportId,
      },
      quantity
    );
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="bg-ivory-warm min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-secondary mb-8">
          <Link href="/" className="hover:text-terracotta">Home</Link>
          <span>/</span>
          <Link href="/art" className="hover:text-terracotta">Art & Crafts</Link>
          <span>/</span>
          <span className="text-charcoal font-semibold truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Top Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-border">
          {/* Gallery Column */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image */}
            <div className="relative h-[420px] sm:h-[500px] w-full rounded-2xl overflow-hidden bg-clay-muted border border-border shadow-md">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.title}
                fill
                priority
                className="object-cover"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-colors ${
                  inWishlist
                    ? 'bg-terracotta text-paper shadow-md'
                    : 'bg-paper/80 text-charcoal hover:bg-paper hover:text-terracotta'
                }`}
                title="Add to Wishlist"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>

              {/* Live Passport Floating Badge */}
              <button
                onClick={() => setShowPassportModal(true)}
                className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-paper/95 backdrop-blur-md text-xs font-bold text-charcoal border border-sand flex items-center gap-2 hover:bg-paper hover:text-terracotta transition-colors shadow-lg"
                title="Click to Scan QR or View Virtual Passport"
              >
                <QrCode className="w-4 h-4 text-terracotta" />
                <span>Verified Passport: {product.passportId}</span>
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === idx ? 'border-terracotta shadow-md scale-105' : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details & Purchase Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-secondary">
                <span className="uppercase tracking-wider font-semibold text-terracotta">
                  {product.category}
                </span>
                <span className="font-mono text-[11px]">ID: {product.id}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
                {product.title}
              </h1>

              {/* Artisan attribution */}
              <div className="flex items-center space-x-2 text-xs text-secondary pt-1">
                <span>Created by</span>
                <Link
                  href={`/artisans/${artisan?.slug || ''}`}
                  className="font-bold text-charcoal hover:text-terracotta underline decoration-sand"
                >
                  {product.artisanName}
                </Link>
                <span>•</span>
                <span className="flex items-center text-secondary">
                  <MapPin className="w-3.5 h-3.5 mr-0.5 text-terracotta" />
                  {product.artisanRegion}
                </span>
              </div>
            </div>

            {/* Price Row */}
            <div className="p-4 rounded-xl bg-paper border border-border flex items-baseline justify-between">
              <div>
                <span className="font-serif text-3xl font-bold text-charcoal">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-secondary line-through ml-3">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <p className="text-[10px] text-forest font-medium mt-0.5">
                  ✓ Includes domestic carbon-neutral packaging & GST
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-forest/15 text-forest text-xs font-bold">
                {product.stock > 0 ? `${product.stock} Available` : 'Sold Out'}
              </span>
            </div>

            {/* Brief Story */}
            <p className="text-sm text-secondary leading-relaxed">
              {product.story}
            </p>

            {/* Quick Specs Chips */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-paper border border-border">
                <span className="text-[10px] text-secondary uppercase font-bold block">Dimensions</span>
                <span className="font-semibold text-charcoal">{product.dimensions}</span>
              </div>
              <div className="p-3 rounded-lg bg-paper border border-border">
                <span className="text-[10px] text-secondary uppercase font-bold block">Weight</span>
                <span className="font-semibold text-charcoal">{product.weight}</span>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-border rounded-xl bg-paper overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3.5 py-2.5 text-charcoal hover:bg-ivory-warm disabled:opacity-40 transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2.5 text-sm font-semibold text-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="px-3.5 py-2.5 text-charcoal hover:bg-ivory-warm disabled:opacity-40 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 py-3 px-6 rounded-xl bg-terracotta hover:bg-terracotta-deep disabled:bg-secondary text-paper text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {addedSuccess ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>
              </div>

              {addedSuccess && (
                <div className="p-2.5 rounded-lg bg-forest/15 border border-forest/30 text-forest text-xs font-semibold flex items-center justify-between">
                  <span>Item added to your shopping cart!</span>
                  <Link href="/cart" className="underline">
                    Proceed to Checkout →
                  </Link>
                </div>
              )}
            </div>

            {/* Provenance Box Link */}
            <div className="p-4 rounded-xl bg-sand/20 border border-sand/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-charcoal flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-terracotta" />
                  Digital Provenance Passport Attached
                </p>
                <p className="text-[11px] text-secondary">
                  Includes geological mine source, lab leach test report, and creation log.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowPassportModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-terracotta text-paper text-xs font-semibold hover:bg-terracotta-deep shadow-sm flex items-center gap-1"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Scan QR / Virtual Scan</span>
                </button>
                <Link
                  href={`/passport/${product.passportId}`}
                  className="px-3 py-1.5 rounded-lg bg-paper border border-border text-xs font-semibold text-charcoal hover:text-terracotta hover:border-terracotta whitespace-nowrap shadow-sm"
                >
                  Full Ledger
                </Link>
              </div>
            </div>

            {/* Sharing & Delivery Assurance */}
            <div className="space-y-2 pt-2 border-t border-border text-xs text-secondary">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-forest" />
                  <span>Ships within 3–5 business days in archival crating</span>
                </div>
                <button
                  onClick={handleShare}
                  className="text-xs text-terracotta hover:underline flex items-center gap-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copiedLink ? 'Link Copied!' : 'Share Art'}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-forest" />
                <span>7-Day Authenticity & Transit Damage Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections: Cultural Significance, Materials Used, Provenance */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-3 gap-8 border-b border-border">
          {/* Card 1: Materials & Mineral Formula */}
          <div className="p-6 rounded-2xl bg-paper border border-border space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
              <Layers className="w-5 h-5 text-terracotta" />
              Mineral Pigments & Media
            </h3>
            <ul className="space-y-2 text-xs text-secondary">
              {product.materialsUsed.map((mat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 shrink-0" />
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-border text-[11px] text-charcoal/80">
              <strong>Batch Reference:</strong> {product.materialBatchId} (CSIR-NML Reference Protocol)
            </div>
          </div>

          {/* Card 2: Cultural Significance */}
          <div className="p-6 rounded-2xl bg-paper border border-border space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-terracotta" />
              Living Cultural Context
            </h3>
            <p className="text-xs text-secondary leading-relaxed">
              {product.culturalSignificance}
            </p>
            <p className="text-[11px] text-secondary">
              Community stewardship protected under RangMitti Co-Design Charter.
            </p>
          </div>

          {/* Card 3: Provenance Milestones */}
          <div className="p-6 rounded-2xl bg-paper border border-border space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-forest" />
              Traceability Baseline
            </h3>
            <div className="space-y-2 text-xs text-secondary">
              <div>
                <span className="font-semibold text-charcoal">Sourcing Node:</span>
                <p>{product.provenance.sourcingLocation}</p>
              </div>
              <div>
                <span className="font-semibold text-charcoal">Characterization:</span>
                <p>{product.provenance.characterizationDate}</p>
              </div>
              <div>
                <span className="font-semibold text-charcoal">Creation Period:</span>
                <p>{product.provenance.creationPeriod}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-border text-[11px] text-forest font-medium">
              ✓ {product.provenance.curationNote}
            </div>
          </div>
        </div>

        {/* Related Artworks */}
        {relatedProducts.length > 0 && (
          <div className="pt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                More in {product.category}
              </h2>
              <Link href="/art" className="text-xs font-semibold text-terracotta hover:underline">
                View All Artworks →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="rounded-2xl bg-paper border border-border overflow-hidden hover:border-sand hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 w-full bg-clay-muted">
                    <Image src={rel.images[0]} alt={rel.title} fill className="object-cover" />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-serif text-base font-bold text-charcoal line-clamp-1">
                      <Link href={`/product/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                    <p className="text-xs text-secondary">By {rel.artisanName}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="font-serif text-lg font-bold text-charcoal">
                        ₹{rel.price.toLocaleString('en-IN')}
                      </span>
                      <Link
                        href={`/product/${rel.slug}`}
                        className="text-xs font-semibold text-terracotta hover:underline"
                      >
                        Inspect →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Global Product Passport Modal (Phone QR & Virtual Scan) */}
      <ProductPassportModal
        isOpen={showPassportModal}
        passportId={product.passportId}
        productTitle={product.title}
        onClose={() => setShowPassportModal(false)}
      />
    </div>
  );
}
