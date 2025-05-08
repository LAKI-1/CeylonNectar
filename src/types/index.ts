export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  origin: string;
  qualityMetrics: {
    purity: number;
    density: number;
    moisture: number;
    color: string;
  };
  images: string[];
  stock: number;
  featured?: boolean;
  bestSeller?: boolean;
  discount?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  role: string;
  content: string;
  rating: number;
}

export interface Order {
  id: string;
  customerId: string;
  vendorId: string;
  products: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  trackingInfo?: {
    carrier: string;
    trackingNumber: string;
    estimatedDelivery: string;
    currentLocation: string;
    updates: {
      status: string;
      location: string;
      timestamp: string;
    }[];
  };
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'inventory' | 'payment' | 'system';
  read: boolean;
  createdAt: string;
}

export interface PriceData {
  date: string;
  price: number;
}

export interface InventoryItem {
  productId: string;
  productName: string;
  stock: number;
  reorderPoint: number;
  lastRestocked: string;
}