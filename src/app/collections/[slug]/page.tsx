'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { sampleCollections } from '@/data/collections';
import { sampleProducts } from '@/data/products';
import { sampleMaterials } from '@/data/materials';
import { ArrowLeft, Sparkles, QrCode, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function CollectionDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const collection = sampleCollections.find((c) => c.slug === slug);
  const { addToCart } = useStore();

  if (!collection) {
    notFound();
  }

  // Filter products or materials matching collection
  const matchingArt = sampleProducts.filter((p) => p.collection === collection.title);
  const matchingMaterials = collection.slug === 'earth-and-colour' ? sampleMaterials : [];

  return (
    <div className="bg-ivory-warm min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <nav className="flex items-center space-x-2 text-xs text-secondary">
          <Link href="/" className="hover:text-terracotta">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-terracotta">Collections</Link>
          <span>/</span>
          <span className="text-charcoal font-semibold">{collection.title}</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-border bg-charcoal text-paper p-8 sm:p-14 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-sand/20 text-sand text-xs font-semibold">
              Curated Thematic Edit
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              {collection.title}
            </h1>
            <p className="text-sm sm:text-base text-ivory-warm/80 leading-relaxed">
              {collection.description}
            </p>
          </div>
        </div>

        {/* Artworks in Collection */}
        {matchingArt.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              Artworks & Handcrafted Pieces
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingArt.map((prd) => (
                <div
                  key={prd.id}
                  className="rounded-2xl bg-paper border border-border overflow-hidden hover:border-sand hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-64 w-full bg-clay-muted">
                      <Image src={prd.images[0]} alt={prd.title} fill className="object-cover" />
                      <Link
                        href={`/passport/${prd.passportId}`}
                        className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-paper/90 backdrop-blur-md text-[10px] font-bold text-charcoal border border-border flex items-center gap-1 shadow-sm"
                      >
                        <QrCode className="w-3 h-3 text-terracotta" />
                        <span>{prd.passportId}</span>
                      </Link>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] uppercase font-bold text-terracotta">
                        {prd.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-charcoal line-clamp-1">
                        <Link href={`/product/${prd.slug}`}>{prd.title}</Link>
                      </h3>
                      <p className="text-xs text-secondary">By {prd.artisanName}</p>
                      <div className="pt-2 flex items-center justify-between border-t border-border">
                        <span className="font-serif text-xl font-bold text-charcoal">
                          ₹{prd.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-forest font-semibold">
                          {prd.stock} Available
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <Link
                      href={`/product/${prd.slug}`}
                      className="py-2.5 rounded-lg border border-border text-center text-xs font-semibold text-charcoal hover:bg-ivory-warm"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() =>
                        addToCart({
                          id: prd.id,
                          type: 'artwork',
                          name: prd.title,
                          slug: prd.slug,
                          price: prd.price,
                          image: prd.images[0],
                          maxStock: prd.stock,
                          sellerName: prd.artisanName,
                          passportId: prd.passportId,
                        })
                      }
                      className="py-2.5 rounded-lg bg-terracotta hover:bg-terracotta-deep text-paper text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Materials in Collection if applicable */}
        {matchingMaterials.length > 0 && (
          <div className="space-y-6 pt-6">
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              Standardized Mineral Creative Materials
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="rounded-2xl bg-paper border border-border overflow-hidden hover:border-sand hover:shadow-lg transition-all p-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-black/20"
                        style={{ backgroundColor: mat.hexCode }}
                      />
                      <span className="text-xs font-bold text-forest">{mat.validationStatus}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-charcoal">{mat.name}</h3>
                    <p className="text-xs text-secondary">{mat.mineralSource}</p>
                    <p className="text-xs text-secondary line-clamp-2">{mat.description}</p>
                  </div>

                  <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
                    <span className="font-serif text-xl font-bold text-charcoal">₹{mat.price}</span>
                    <Link
                      href="/materials"
                      className="px-4 py-2 rounded-lg bg-forest hover:bg-forest-deep text-paper text-xs font-semibold"
                    >
                      Inspect Specs
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
