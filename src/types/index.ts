export type ValidationStatus =
  | 'Not Tested'
  | 'Testing In Progress'
  | 'Validation Pending'
  | 'Validated for Specified Use'
  | 'Rejected';

export type ProductType = 'material' | 'artwork';

export interface LabParameter {
  name: string;
  result: string;
  passed: boolean;
  notes?: string;
}

export interface LabTestRecord {
  batchNumber: string;
  labName: string;
  testDate: string;
  reviewer: string;
  reviewTimestamp: string;
  scope: string;
  parameters: LabParameter[];
  certificateNote: string;
  documentRef?: string;
}

export interface MaterialItem {
  id: string;
  slug: string;
  passportId?: string;
  name: string;
  mineralSource: string;
  category: 'Raw Pigment Powder' | 'Processed Slurry' | 'Fine Aggregate' | 'Ceramic Wash' | 'Watercolour Base';
  color: string;
  hexCode: string;
  particleSize: string;
  packSizes: string[];
  price: number;
  originalPrice?: number;
  stock: number;
  validationStatus: ValidationStatus;
  intendedUse: string;
  limitations: string;
  labTestSummary: LabTestRecord;
  image: string;
  gallery?: string[];
  description: string;
  seller: {
    id: string;
    name: string;
    type: string;
    region: string;
    verified: boolean;
  };
}

export interface ArtisanProfile {
  id: string;
  slug: string;
  name: string;
  craft: string;
  tribe: string;
  region: string;
  bio: string;
  avatar: string;
  heroImage: string;
  quote: string;
  yearsOfExperience: number;
  verified: boolean;
  productsCount: number;
  specialtyMotifs: string[];
  materialsUsed: string[];
}

export interface ArtisanProduct {
  id: string;
  passportId: string;
  title: string;
  slug: string;
  category: 'Paintings & Wall Art' | 'Terracotta Decor' | 'Dokra Metal & Mineral Fusion' | 'Handcrafted Paper Art' | 'Ceramic Vessels' | 'Wearable Art & Handlooms';
  artisanId: string;
  artisanName: string;
  artisanRegion: string;
  materialsUsed: string[];
  materialBatchId: string;
  dimensions: string;
  weight: string;
  price: number;
  originalPrice?: number;
  stock: number;
  featured: boolean;
  images: string[];
  collection: string;
  story: string;
  culturalSignificance: string;
  provenance: {
    sourcingLocation: string;
    characterizationDate: string;
    formulationDate: string;
    creationPeriod: string;
    curationNote: string;
  };
}

export interface PassportRecord {
  productId: string;
  passportId: string;
  productName: string;
  productType: ProductType;
  image: string;
  issueDate: string;
  lastUpdated: string;
  status: 'Active' | 'Verified' | 'Under Review';
  geologicalOrigin: {
    region: string;
    mineOrSite: string;
    mineralStream: string;
    coordinates?: string;
  };
  materialBatch: {
    batchNumber: string;
    processingDate: string;
    safetyStatus: ValidationStatus;
    labName: string;
    testSummary: string;
    heavyMetalsPassed: boolean;
  };
  artisanDetails?: {
    id: string;
    name: string;
    community: string;
    region: string;
  };
  journeySteps: {
    stepNumber: string;
    title: string;
    description: string;
    date: string;
    verified: boolean;
    location: string;
  }[];
  verificationToken: string;
  printCertificateUrl?: string;
}

export interface CartItem {
  id: string;
  type: ProductType;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  maxStock: number;
  sellerName: string;
  selectedVariant?: string;
  passportId?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sellerName: string;
  passportId?: string;
}

export interface OrderRecord {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    deliveryNotes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'Simulated Paid (Demo)' | 'Pending Verification';
  orderStatus: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  trackingNumber: string;
}

export interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  bannerImage: string;
  tags: string[];
  productCount: number;
}
