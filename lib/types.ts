export type ProductCondition =
  | "NEW_WITH_TAGS"
  | "LIKE_NEW"
  | "GENTLY_USED"
  | "FAIR";

export interface Seller {
  id: string;

  name: string;

  rating: number;

  joinedDate: string;

  location: string;

  avatarUrl?: string;

  verified?: boolean;

  totalSales?: number;

  bio?: string;

  // Future contact methods
  phone?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  size?: string;
  brand?: string;
  condition: ProductCondition;
  conditionScore: number;
  seller: Seller;
  featured?: boolean;
  createdAt: string;

  tags?: string[];

  embedding?: number[];

  aiSummary?: string;
}

export interface CartItem {
  id: string;

  title: string;

  price: number;

  image: string;

  size?: string;

  condition: ProductCondition;

  quantity: number;

  sellerId?: string;
}

export interface OrderDetails {
  fullName: string;

  phone: string;

  address: string;

  city: string;

  deliveryNotes?: string;
}