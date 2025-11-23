export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isGenius: boolean;
  category: string;
  tags?: string[];
  description?: string;
  features?: string[];
  specs?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}