'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, ProductType, OrderRecord } from '@/types';

interface StoreContextType {
  cart: CartItem[];
  addToCart: (item: {
    id: string;
    type: ProductType;
    name: string;
    slug: string;
    price: number;
    image: string;
    maxStock: number;
    sellerName: string;
    selectedVariant?: string;
    passportId?: string;
  }, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  couponCode: string;
  applyCoupon: (code: string) => { success: boolean; message: string };
  total: number;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;

  // Active Demo User Role
  demoRole: 'customer' | 'seller' | 'admin';
  setDemoRole: (role: 'customer' | 'seller' | 'admin') => void;

  // Orders
  orders: OrderRecord[];
  addOrder: (order: OrderRecord) => void;
  getOrderById: (orderId: string) => OrderRecord | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [demoRole, setDemoRole] = useState<'customer' | 'seller' | 'admin'>('customer');
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('rangmitti_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('rangmitti_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem('rangmitti_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        // Seed an initial demo order so orders page isn't empty!
        const initialOrder: OrderRecord = {
          orderId: 'RM-ORD-2026-9041',
          customerName: 'Aarav Sharma',
          customerEmail: 'aarav.sharma@example.com',
          customerPhone: '+91 98765 43210',
          shippingAddress: {
            street: '42 Heritage Enclave, Circular Road',
            city: 'Ranchi',
            state: 'Jharkhand',
            pincode: '834001',
            deliveryNotes: 'Please call before delivery',
          },
          items: [
            {
              id: 'PRD-ART-001',
              name: 'Sohrai Forest & Birds Motif - Hand-Painted Canvas',
              price: 4850,
              quantity: 1,
              image: '/images/products/sohrai-forest-canvas-1.jpg',
              sellerName: 'Shanti Soren',
              passportId: 'RM-001-ART-007',
            },
          ],
          subtotal: 4850,
          shippingFee: 0,
          discount: 485,
          total: 4365,
          paymentMethod: 'Simulated UPI / Net Banking (Demo Mode)',
          paymentStatus: 'Simulated Paid (Demo)',
          orderStatus: 'Confirmed',
          createdAt: '2026-03-12T10:30:00Z',
          trackingNumber: 'RM-DEL-778942-IN',
        };
        setOrders([initialOrder]);
        localStorage.setItem('rangmitti_orders', JSON.stringify([initialOrder]));
      }
    } catch {
      // ignore SSR parsing
    }
  }, []);

  // Save cart
  useEffect(() => {
    try {
      localStorage.setItem('rangmitti_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Save wishlist
  useEffect(() => {
    try {
      localStorage.setItem('rangmitti_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Save orders
  useEffect(() => {
    try {
      localStorage.setItem('rangmitti_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const addToCart = (
    item: {
      id: string;
      type: ProductType;
      name: string;
      slug: string;
      price: number;
      image: string;
      maxStock: number;
      sellerName: string;
      selectedVariant?: string;
      passportId?: string;
    },
    quantity: number = 1
  ) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, item.maxStock);
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i));
      } else {
        return [...prev, { ...item, quantity: Math.min(quantity, item.maxStock) }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.min(quantity, i.maxStock) } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountAmount(0);
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 99;

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'IDEATRIBE2026') {
      setCouponCode('IDEATRIBE2026');
      setDiscountAmount(Math.round(subtotal * 0.15));
      return { success: true, message: 'Special Idea Tribe 2026 Jury Discount Applied (15% Off)' };
    }
    if (clean === 'RANGMITTI10') {
      setCouponCode('RANGMITTI10');
      setDiscountAmount(Math.round(subtotal * 0.10));
      return { success: true, message: 'Welcome code applied! 10% discount on order.' };
    }
    return { success: false, message: 'Invalid promo code. Try "IDEATRIBE2026"' };
  };

  const total = Math.max(0, subtotal + shipping - discountAmount);

  const addOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.orderId === orderId);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shipping,
        discount: discountAmount,
        couponCode,
        applyCoupon,
        total,
        wishlist,
        toggleWishlist,
        isInWishlist,
        demoRole,
        setDemoRole,
        orders,
        addOrder,
        getOrderById,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
