import { Product, Testimonial, Order, Notification, PriceData, InventoryItem } from '../types';

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Wild Forest Honey",
    description: "Pure, unfiltered honey harvested from the pristine forests of central Sri Lanka. Our wild forest honey is collected by experienced beekeepers from natural hives found in the diverse ecosystem of Sri Lanka's forest reserves.",
    price: 24.99,
    type: "Wild Forest",
    origin: "Central Province, Sri Lanka",
    qualityMetrics: {
      purity: 98,
      density: 1.42,
      moisture: 17.5,
      color: "Deep Amber"
    },
    images: [
      "https://images.pexels.com/photos/6412527/pexels-photo-6412527.jpeg",
      "https://images.pexels.com/photos/9246837/pexels-photo-9246837.jpeg"
    ],
    stock: 45,
    featured: true,
    bestSeller: true
  },
  {
    id: "prod-002",
    name: "Cinnamon Blossom Honey",
    description: "A unique specialty honey with subtle notes of cinnamon collected from the blossoms of Sri Lanka's world-famous cinnamon plantations. This rare honey is only available during the brief flowering season.",
    price: 29.99,
    type: "Cinnamon Blossom",
    origin: "Southern Province, Sri Lanka",
    qualityMetrics: {
      purity: 99,
      density: 1.44,
      moisture: 16.8,
      color: "Light Amber"
    },
    images: [
      "https://images.pexels.com/photos/7657636/pexels-photo-7657636.jpeg",
      "https://images.pexels.com/photos/5946305/pexels-photo-5946305.jpeg"
    ],
    stock: 28,
    featured: true
  },
  {
    id: "prod-003",
    name: "Multifloral Mountain Honey",
    description: "Collected from diverse wildflowers in Sri Lanka's central highlands, this honey features a complex flavor profile that changes with the seasons and flowering patterns of the mountain ecosystem.",
    price: 22.99,
    type: "Multifloral",
    origin: "Nuwara Eliya, Sri Lanka",
    qualityMetrics: {
      purity: 97,
      density: 1.41,
      moisture: 18.2,
      color: "Medium Amber"
    },
    images: [
      "https://images.pexels.com/photos/12598001/pexels-photo-12598001.jpeg",
      "https://images.pexels.com/photos/5946083/pexels-photo-5946083.jpeg"
    ],
    stock: 37,
    discount: 10
  },
  {
    id: "prod-004",
    name: "Coconut Blossom Honey",
    description: "A tropical delight harvested from coconut palm blossoms along Sri Lanka's pristine coastline. This honey has a light, distinctive taste with subtle caramel notes unique to coconut nectar.",
    price: 26.99,
    type: "Coconut Blossom",
    origin: "Coastal Regions, Sri Lanka",
    qualityMetrics: {
      purity: 98,
      density: 1.43,
      moisture: 17.0,
      color: "Light Amber"
    },
    images: [
      "https://images.pexels.com/photos/6412508/pexels-photo-6412508.jpeg",
      "https://images.pexels.com/photos/8617843/pexels-photo-8617843.jpeg"
    ],
    stock: 32,
    bestSeller: true
  },
  {
    id: "prod-005",
    name: "Royal Manuka Honey",
    description: "Rare and medicinal honey from the Manuka bushes introduced to Sri Lanka's hill country. Known for its exceptional antibacterial properties and distinctive flavor profile.",
    price: 39.99,
    type: "Manuka",
    origin: "Uva Province, Sri Lanka",
    qualityMetrics: {
      purity: 99,
      density: 1.45,
      moisture: 16.5,
      color: "Dark Amber"
    },
    images: [
      "https://images.pexels.com/photos/2487443/pexels-photo-2487443.jpeg",
      "https://images.pexels.com/photos/7657798/pexels-photo-7657798.jpeg"
    ],
    stock: 15,
    featured: true
  },
  {
    id: "prod-006",
    name: "Ceylon Tea Blossom Honey",
    description: "A specialty honey created when bees forage in Sri Lanka's famous tea plantations during the flowering season. Subtle notes of tea blossom create a uniquely Sri Lankan honey experience.",
    price: 32.99,
    type: "Tea Blossom",
    origin: "Kandy, Sri Lanka",
    qualityMetrics: {
      purity: 98,
      density: 1.42,
      moisture: 17.2,
      color: "Medium Amber"
    },
    images: [
      "https://images.pexels.com/photos/7963572/pexels-photo-7963572.jpeg",
      "https://images.pexels.com/photos/7790807/pexels-photo-7790807.jpeg"
    ],
    stock: 22,
    discount: 15
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "test-001",
    name: "Emily Richardson",
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
    role: "Culinary Chef",
    content: "Ceylon Nectar's Wild Forest Honey has transformed my dessert creations. The depth of flavor is unmatched, and knowing it comes directly from Sri Lankan forests makes each dish special.",
    rating: 5
  },
  {
    id: "test-002",
    name: "David Wilson",
    image: "https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg",
    role: "Health & Wellness Coach",
    content: "I recommend Ceylon Nectar to all my clients. The purity and quality of their honey varieties is evident in every spoonful, and the health benefits my clients report are remarkable.",
    rating: 5
  },
  {
    id: "test-003",
    name: "Sarah Johnson",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    role: "Food Blogger",
    content: "As someone who's tried honey from around the world, Ceylon Nectar's Cinnamon Blossom Honey stands out as a truly unique product. The subtle cinnamon notes are divine!",
    rating: 4
  }
];

export const orders: Order[] = [
  {
    id: "order-001",
    customerId: "user-1234",
    vendorId: "vendor-5678",
    products: [
      {
        productId: "prod-001",
        name: "Wild Forest Honey",
        quantity: 2,
        price: 24.99
      },
      {
        productId: "prod-002",
        name: "Cinnamon Blossom Honey",
        quantity: 1,
        price: 29.99
      }
    ],
    totalAmount: 79.97,
    status: "shipped",
    createdAt: "2023-11-15T08:24:00Z",
    updatedAt: "2023-11-16T14:30:00Z",
    shippingAddress: {
      fullName: "Jane Smith",
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      postalCode: "02108",
      country: "United States"
    },
    trackingInfo: {
      carrier: "FedEx",
      trackingNumber: "FX7243789125",
      estimatedDelivery: "2023-11-22",
      currentLocation: "New York Distribution Center",
      updates: [
        {
          status: "Order Processed",
          location: "Colombo, Sri Lanka",
          timestamp: "2023-11-15T12:00:00Z"
        },
        {
          status: "Shipped",
          location: "Colombo International Airport",
          timestamp: "2023-11-16T14:30:00Z"
        },
        {
          status: "In Transit",
          location: "Dubai International Airport",
          timestamp: "2023-11-18T03:15:00Z"
        },
        {
          status: "Arrived at Destination Country",
          location: "JFK International Airport",
          timestamp: "2023-11-19T22:40:00Z"
        },
        {
          status: "At Local Facility",
          location: "New York Distribution Center",
          timestamp: "2023-11-20T10:20:00Z"
        }
      ]
    }
  },
  {
    id: "order-002",
    customerId: "user-1234",
    vendorId: "vendor-9012",
    products: [
      {
        productId: "prod-004",
        name: "Coconut Blossom Honey",
        quantity: 3,
        price: 26.99
      }
    ],
    totalAmount: 80.97,
    status: "processing",
    createdAt: "2023-11-19T15:42:00Z",
    updatedAt: "2023-11-19T16:30:00Z",
    shippingAddress: {
      fullName: "Jane Smith",
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      postalCode: "02108",
      country: "United States"
    }
  }
];

export const notifications: Notification[] = [
  {
    id: "notif-001",
    userId: "vendor-5678",
    title: "New Order Received",
    message: "You have received a new order #order-001 for 3 products. Please process it within 24 hours.",
    type: "order",
    read: false,
    createdAt: "2023-11-15T08:24:00Z"
  },
  {
    id: "notif-002",
    userId: "vendor-5678",
    title: "Low Stock Alert",
    message: "Wild Forest Honey is running low with only 5 units remaining. Consider restocking soon.",
    type: "inventory",
    read: true,
    createdAt: "2023-11-14T09:15:00Z"
  },
  {
    id: "notif-003",
    userId: "vendor-5678",
    title: "Payment Received",
    message: "Payment for order #order-001 has been successfully processed and added to your account.",
    type: "payment",
    read: false,
    createdAt: "2023-11-15T08:30:00Z"
  },
  {
    id: "notif-004",
    userId: "vendor-5678",
    title: "Price Prediction Update",
    message: "Our AI system predicts a 5% increase in market prices for Cinnamon Blossom Honey in the coming month.",
    type: "system",
    read: false,
    createdAt: "2023-11-13T14:00:00Z"
  }
];

export const priceHistory: PriceData[] = [
  { date: "2023-06-01", price: 23.99 },
  { date: "2023-07-01", price: 24.50 },
  { date: "2023-08-01", price: 24.50 },
  { date: "2023-09-01", price: 24.75 },
  { date: "2023-10-01", price: 24.99 },
  { date: "2023-11-01", price: 24.99 },
];

export const pricePrediction: PriceData[] = [
  { date: "2023-11-01", price: 24.99 },
  { date: "2023-12-01", price: 25.25 },
  { date: "2024-01-01", price: 25.50 },
  { date: "2024-02-01", price: 25.99 },
  { date: "2024-03-01", price: 26.25 },
  { date: "2024-04-01", price: 26.50 },
];

export const inventoryItems: InventoryItem[] = [
  {
    productId: "prod-001",
    productName: "Wild Forest Honey",
    stock: 45,
    reorderPoint: 15,
    lastRestocked: "2023-10-15"
  },
  {
    productId: "prod-002",
    productName: "Cinnamon Blossom Honey",
    stock: 28,
    reorderPoint: 10,
    lastRestocked: "2023-10-20"
  },
  {
    productId: "prod-003",
    productName: "Multifloral Mountain Honey",
    stock: 37,
    reorderPoint: 12,
    lastRestocked: "2023-09-30"
  },
  {
    productId: "prod-004",
    productName: "Coconut Blossom Honey",
    stock: 32,
    reorderPoint: 12,
    lastRestocked: "2023-10-05"
  },
  {
    productId: "prod-005",
    productName: "Royal Manuka Honey",
    stock: 15,
    reorderPoint: 8,
    lastRestocked: "2023-10-25"
  },
  {
    productId: "prod-006",
    productName: "Ceylon Tea Blossom Honey",
    stock: 22,
    reorderPoint: 10,
    lastRestocked: "2023-10-10"
  }
];