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

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  email: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: CartItem[];
}

export interface PromoCode {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  isActive: boolean;
}