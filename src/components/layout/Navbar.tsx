'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  FileCheck, 
  Store, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import SearchModal from '@/components/common/SearchModal';

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, wishlist, demoRole } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAccountDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Materials', href: '/materials', badge: 'Validated' },
    { label: 'Art & Crafts', href: '/art' },
    { label: 'Artisans', href: '/artisans' },
    { label: 'Collections', href: '/collections' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Our Story', href: '/our-story' },
    { label: 'Passport', href: '/passport/RM-001-ART-007', highlight: true },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-charcoal text-paper text-xs py-2 px-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-sand animate-pulse" />
            <span className="font-medium tracking-wide">
              Rooted in Jharkhand. Designed for creative possibilities.
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-secondary-200 text-[11px]">
            <span className="text-sand">Idea Tribe 2026 Presentation Pilot</span>
            <span className="opacity-40">|</span>
            <Link href="/impact" className="hover:text-sand transition-colors">
              Impact Framework
            </Link>
            <span className="opacity-40">|</span>
            <Link href="/bulk-orders" className="hover:text-sand transition-colors">
              Institutional & Bulk Enquiries
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b border-border ${
          isScrolled ? 'bg-paper/95 backdrop-blur-md shadow-sm py-3' : 'bg-ivory-warm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="group flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-terracotta flex items-center justify-center text-paper font-serif font-bold text-xl shadow-inner group-hover:bg-terracotta-deep transition-colors">
                RM
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-charcoal leading-none">
                  RangMitti<span className="text-terracotta text-sm font-sans ml-1 font-semibold">2.0</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-secondary mt-0.5">
                  From Earth to Art
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${
                      isActive
                        ? 'text-terracotta font-semibold'
                        : 'text-charcoal/80 hover:text-terracotta hover:bg-clay-muted/30'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-forest/10 text-forest font-semibold uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                    {link.highlight && (
                      <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-terracotta/10 text-terracotta font-semibold uppercase tracking-wider">
                        Live QR
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Search, Wishlist, Cart, Sell, Account */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search materials and art"
                className="p-2 text-charcoal/80 hover:text-terracotta hover:bg-clay-muted/40 rounded-full transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                <Search className="w-5 h-5" />
                <span className="hidden md:inline-block text-secondary">Search</span>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative p-2 text-charcoal/80 hover:text-terracotta hover:bg-clay-muted/40 rounded-full transition-colors"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-terracotta text-paper text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label="Shopping Cart"
                className="relative p-2 text-charcoal/80 hover:text-terracotta hover:bg-clay-muted/40 rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-forest text-paper text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="flex items-center space-x-1 p-1.5 text-charcoal/80 hover:text-terracotta hover:bg-clay-muted/40 rounded-full transition-colors"
                  aria-label="Account Menu"
                >
                  <div className="w-7 h-7 rounded-full bg-sand/40 border border-sand flex items-center justify-center text-xs font-semibold text-charcoal">
                    {demoRole === 'admin' ? 'AD' : demoRole === 'seller' ? 'SE' : 'CU'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-secondary" />
                </button>

                {accountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-paper rounded-xl shadow-xl border border-border p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-border/60 mb-1">
                      <p className="text-xs text-secondary font-medium">Active Demo Session</p>
                      <p className="text-sm font-semibold text-charcoal capitalize">
                        {demoRole} Mode
                      </p>
                    </div>

                    <div className="space-y-0.5 text-xs font-medium text-charcoal/90">
                      <Link
                        href="/account"
                        className="flex items-center px-3 py-2 rounded-lg hover:bg-ivory-warm hover:text-terracotta transition-colors"
                      >
                        <User className="w-4 h-4 mr-2.5 text-secondary" />
                        Customer Profile
                      </Link>
                      <Link
                        href="/account/orders"
                        className="flex items-center px-3 py-2 rounded-lg hover:bg-ivory-warm hover:text-terracotta transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2.5 text-secondary" />
                        My Orders
                      </Link>
                      <div className="border-t border-border/50 my-1 pt-1">
                        <Link
                          href="/seller/dashboard"
                          className="flex items-center px-3 py-2 rounded-lg hover:bg-ivory-warm text-terracotta transition-colors font-semibold"
                        >
                          <Store className="w-4 h-4 mr-2.5" />
                          Seller Dashboard
                        </Link>
                        <Link
                          href="/admin"
                          className="flex items-center px-3 py-2 rounded-lg hover:bg-ivory-warm text-forest transition-colors font-semibold"
                        >
                          <ShieldCheck className="w-4 h-4 mr-2.5" />
                          Admin Control Center
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sell CTA (Desktop) */}
              <Link
                href="/sell"
                className="hidden sm:inline-flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-full border border-terracotta text-terracotta hover:bg-terracotta hover:text-paper transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Sell with Us
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-2 text-charcoal hover:text-terracotta transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[73px] bg-paper border-b border-border shadow-2xl p-6 z-50 animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col space-y-3 pb-6 border-b border-border">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between text-base font-medium text-charcoal hover:text-terracotta py-2 px-3 rounded-lg hover:bg-ivory-warm transition-colors"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-forest/10 text-forest font-semibold uppercase">
                      {link.badge}
                    </span>
                  )}
                  {link.highlight && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-terracotta/10 text-terracotta font-semibold uppercase">
                      Live QR
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-4 grid grid-cols-2 gap-3">
              <Link
                href="/seller/dashboard"
                className="flex items-center justify-center py-2.5 px-3 rounded-lg bg-ivory-warm text-terracotta text-xs font-semibold border border-terracotta/30"
              >
                <Store className="w-4 h-4 mr-1.5" />
                Seller Portal
              </Link>
              <Link
                href="/admin"
                className="flex items-center justify-center py-2.5 px-3 rounded-lg bg-ivory-warm text-forest text-xs font-semibold border border-forest/30"
              >
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                Admin Panel
              </Link>
              <Link
                href="/sell"
                className="col-span-2 flex items-center justify-center py-2.5 px-4 rounded-lg bg-terracotta text-paper text-sm font-semibold hover:bg-terracotta-deep transition-colors"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Apply as Artisan or Supplier
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
