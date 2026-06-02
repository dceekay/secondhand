import { Product, Seller } from "@/lib/types";

// Dynamic Mock Sellers
export const MOCK_SELLERS: Record<string, Seller> = {
  damilola: {
    id: "seller-1",
    name: "Damilola K.",
    rating: 4.9,
    phone: "2348031234567", // WhatsApp ready (no +, no 00)
    joinedDate: "October 2024",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
  },
  chioma: {
    id: "seller-2",
    name: "Chioma A.",
    rating: 4.8,
    phone: "2348123456789",
    joinedDate: "January 2025",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
  },
  tunde: {
    id: "seller-3",
    name: "Tunde E.",
    rating: 4.6,
    phone: "2347065432109",
    joinedDate: "December 2024",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
  },
  nneka: {
    id: "seller-4",
    name: "Nneka O.",
    rating: 4.7,
    phone: "2349088877766",
    joinedDate: "March 2025",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
  },
};

// Realistic SecondHand Items Database
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Vintage Distressed Leather Jacket",
    description: "Classic heavy-duty distressed leather bomber jacket. Kept in excellent storage condition. The leather has formed a beautiful natural patina over time. Inner lining is 100% intact with zero tears. Perfect for vintage fashion enthusiasts looking for a timeless, rugged layer.",
    price: 35000,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80",
    ],
    category: "Fashion",
    size: "L (EU 52)",
    brand: "LeatherCraft",
    condition: "GENTLY_USED",
    conditionScore: 8.5,
    seller: MOCK_SELLERS.chioma,
    featured: true,
    createdAt: "2026-05-15T10:30:00Z",
  },
  {
    id: "prod-2",
    title: "Nike Air Jordan 1 Retro High 'Chicago'",
    description: "Iconic Jordan 1 Chicago. Only worn twice for indoor photoshoots. Crease protectors were used, so there are absolutely no toe box creases. Outsoles are clean with 99% stars visible. Comes with the original box, extra laces, and verification tags. A true gem for sneaker collectors.",
    price: 85000,
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
    ],
    category: "Sneakers",
    size: "US 9.5 (EU 43)",
    brand: "Nike",
    condition: "LIKE_NEW",
    conditionScore: 9.5,
    seller: MOCK_SELLERS.damilola,
    featured: true,
    createdAt: "2026-05-18T14:20:00Z",
  },
  {
    id: "prod-3",
    title: "iPhone 13 Pro Max - 128GB (Graphite)",
    description: "Fully unlocked iPhone 13 Pro Max. Battery health is at 90% and easily lasts all day. Screen is completely pristine, always protected by a high-quality tempered glass. Minor pocket-wear micro-scratches on the stainless steel sides, barely visible. Comes with a charging cable and free shockproof case.",
    price: 480000,
    images: [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80",
      "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=800&q=80",
    ],
    category: "Electronics",
    size: "128GB",
    brand: "Apple",
    condition: "GENTLY_USED",
    conditionScore: 9.0,
    seller: MOCK_SELLERS.tunde,
    featured: true,
    createdAt: "2026-05-20T08:00:00Z",
  },
  {
    id: "prod-4",
    title: "Minimalist Solid Oak Coffee Table",
    description: "Sturdy mid-century modern oak coffee table. Handcrafted with beautiful visible wood grain. Has a few light water rings and minor surface scratches on the top from daily use, which adds to its authentic rustic character. Easily refinished if you prefer a brand new polished look.",
    price: 45000,
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80",
      "https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=800&q=80",
    ],
    category: "Home",
    size: "110cm x 60cm",
    brand: "Local Artisans",
    condition: "FAIR",
    conditionScore: 7.5,
    seller: MOCK_SELLERS.nneka,
    featured: false,
    createdAt: "2026-05-10T12:00:00Z",
  },
  {
    id: "prod-5",
    title: "Unopened Levi's Corduroy Trucker Shirt",
    description: "Brand new with tags still attached. Unwanted gift. Rich olive-green corduroy fabric with metal snap buttons. Extremely warm, thick quality that can be styled as an overshirt. Kept in a smoke-free and pet-free closet.",
    price: 12500,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80",
    ],
    category: "Fashion",
    size: "M (Regular Fit)",
    brand: "Levi's",
    condition: "NEW_WITH_TAGS",
    conditionScore: 10.0,
    seller: MOCK_SELLERS.chioma,
    featured: true,
    createdAt: "2026-05-21T09:15:00Z",
  },
  {
    id: "prod-6",
    title: "Adidas Yeezy Boost 350 V2 'Carbon'",
    description: "Authentic Yeezy Carbon. Uppers are in great condition with zero pulls. Boost sole shows typical wear and slight yellowing from outdoor pavements, but retains complete bounce and comfort. Insoles have slight lettering fade. Great daily wear option at an absolute bargain.",
    price: 95000,
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    ],
    category: "Sneakers",
    size: "US 10 (EU 44)",
    brand: "Adidas",
    condition: "GENTLY_USED",
    conditionScore: 8.0,
    seller: MOCK_SELLERS.damilola,
    featured: false,
    createdAt: "2026-05-12T16:45:00Z",
  },
  {
    id: "prod-7",
    title: "Keychron K2 Mechanical Keyboard",
    description: "Keychron K2 wireless mechanical keyboard with Gateron Brown tactile switches. Sleek RGB backlighting with 15+ lighting effects. Comes with original keycap puller, dynamic Windows/Mac layout replacement keycaps, and USB-C braided cable. Perfect for creators and programmers.",
    price: 38000,
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
    ],
    category: "Electronics",
    size: "75% Layout",
    brand: "Keychron",
    condition: "LIKE_NEW",
    conditionScore: 9.8,
    seller: MOCK_SELLERS.tunde,
    featured: true,
    createdAt: "2026-05-19T11:10:00Z",
  },
  {
    id: "prod-8",
    title: "Handmade Ceramic Textured Vases",
    description: "A gorgeous set of 3 matching earth-toned ceramic vases. Hand-thrown on a wheel and double-glazed for a beautiful matte finish. Perfect for pampas grass, dried flowers, or as stand-alone sculptural shelf accents. Brand new, zero chips or hairline cracks.",
    price: 18000,
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
    ],
    category: "Home",
    size: "Set of 3 (Assorted)",
    brand: "ClayStudio",
    condition: "NEW_WITH_TAGS",
    conditionScore: 10.0,
    seller: MOCK_SELLERS.nneka,
    featured: false,
    createdAt: "2026-05-14T15:30:00Z",
  },
  {
    id: "prod-9",
    title: "Sony WH-1000XM4 Noise-Cancelling Headphones",
    description: "Top-tier active noise-cancelling headphones in matte black. Sound quality is stellar. Cushions show very light wear but still seal perfectly. Touch sensor controls on the right ear cup work flawlessly. Package includes the original hard carry case, 3.5mm audio jack, and airplane adapter.",
    price: 150000,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
    ],
    category: "Electronics",
    size: "Over-Ear",
    brand: "Sony",
    condition: "GENTLY_USED",
    conditionScore: 8.8,
    seller: MOCK_SELLERS.tunde,
    featured: true,
    createdAt: "2026-05-22T09:00:00Z",
  },
];

// Helper functions for easy data access
export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.featured === true);
}

export function getProductsByCategory(category: string): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export const CATEGORIES = ["All", "Fashion", "Sneakers", "Electronics", "Home"];
