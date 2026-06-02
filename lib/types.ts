export type ProductCondition = 'NEW_WITH_TAGS' | 'LIKE_NEW' | 'GENTLY_USED' | 'FAIR';

export interface Seller {
  id: string;
  name: string;
  rating: number; // e.g. 4.8
  phone: string; // WhatsApp formatted phone number, e.g. "2348012345678"
  joinedDate: string;
  avatarUrl?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // in Naira (₦)
  images: string[];
  category: string; // e.g. "Fashion", "Sneakers", "Electronics", "Home"
  size?: string; // e.g. "L", "EU 43", "One Size"
  brand?: string; // e.g. "Nike", "Apple", "Zara"
  condition: ProductCondition;
  conditionScore: number; // Out of 10, e.g. 9.5
  seller: Seller;
  featured?: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  size?: string;
  condition: ProductCondition;
  sellerPhone: string;
  quantity: number;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  deliveryNotes?: string;
}
