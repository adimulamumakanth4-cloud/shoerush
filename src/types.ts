export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: 'sneakers' | 'boots' | 'dress' | 'rare' | 'antique';
  sizes: number[];
  colors: string[];
  stock: number;
  reviews: Review[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isRare?: boolean;
  isAuction?: boolean;
  auctionEndTime?: string;
  currentBid?: number;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

export interface CartItem extends Product {
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  trackingNumber?: string;
}
