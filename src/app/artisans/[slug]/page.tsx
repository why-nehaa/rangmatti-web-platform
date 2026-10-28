'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { sampleArtisans } from '@/data/artisans';
import { sampleProducts } from '@/data/products';
import { ArrowLeft, MapPin, QrCode, Sparkles, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ArtisanDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const artisan = sampleArtisans.find((a) => a.slug === slug);
  const { addToCart } = useStore();

  if (!artisan) {
    notFound();
  }

  const artisanProducts = sampleProducts.filter((p) => p.artisanId === artisan.id);

  return (
    <div className="bg-ivory-warm min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-secondary">
          <Link href="/" className="hover:text-terracotta">Home</Link>
          <span>/</span>
          <Link href="/artisans" className="hover:text-terracotta">Artisans</Link>
          <span>/</span>
          <span className="text-charcoal font-semibold">{artisan.name}</span>
        </nav>

        {/* Hero Banner Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-paper border border-border shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-clay-muted border border-border">
            <Image
              src={artisan.heroImage}
              alt={artisan.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sand/30 text-charcoal text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>{artisan.craft}</span>
              <span className="opacity-40">•</span>
              <span>{artisan.tribe}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              {artisan.name}
            </h1>

            <p className="text-xs text-secondary flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-terracotta shrink-0" />
              {artisan.region}
            </p>

            <div className="p-4 rounded-2xl bg-sand/20 border border-sand/40">
              <p className="font-serif italic text-sm text-charcoal leading-relaxed">
                "{artisan.quote}"
              </p>
            </div>

            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              {artisan.bio}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-ivory-warm text-charcoal font-semibold">
                {artisan.yearsOfExperience} Years Dedicated Craft
              </span>
              <span className="px-3 py-1 rounded-lg bg-forest/15 text-forest font-semibold">
                Verified Material Partner
              </span>
            </div>
          </div>
        </div>

        {/* Artworks by this Artisan */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                Creations by {artisan.name.split(' (')[0]}
              </h2>
              <p className="text-xs text-secondary mt-0.5">
                {artisanProducts.length} verified pieces available on RangMitti
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artisanProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl bg-paper border border-border overflow-hidden hover:border-sand hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 w-full bg-clay-muted">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    <Link
                      href={`/passport/${product.passportId}`}
                      className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-paper/90 backdrop-blur-md text-[10px] font-bold text-charcoal border border-border flex items-center gap-1 shadow-sm"
                    >
                      <QrCode className="w-3 h-3 text-terracotta" />
                      <span>{product.passportId}</span>
                    </Link>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-terracotta">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-charcoal line-clamp-1">
                      <Link href={`/product/${product.slug}`}>{product.title}</Link>
                    </h3>
                    <p className="text-xs text-secondary line-clamp-2">
                      {product.story}
                    </p>
                    <div className="pt-2 flex items-center justify-between border-t border-border">
                      <span className="font-serif text-xl font-bold text-charcoal">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-forest font-semibold">
                        {product.stock} Available
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <Link
                    href={`/product/${product.slug}`}
                    className="py-2.5 rounded-lg border border-border text-center text-xs font-semibold text-charcoal hover:bg-ivory-warm"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() =>
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
      </div>
    </div>
  );
}
