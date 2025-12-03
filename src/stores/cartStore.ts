import { reactive, computed } from 'vue';
import type { Product, CartState } from '@/types';

// Sample products data
export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 15999000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop",
    description: "Latest iPhone with titanium design and A17 Pro chip",
    category: "Electronics",
    stock: 10
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: 18999000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
    description: "Ultra-thin laptop with M2 chip for ultimate performance",
    category: "Electronics", 
    stock: 5
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    price: 1899000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    description: "Comfortable running shoes with Air Max technology",
    category: "Fashion",
    stock: 15
  },
  {
    id: 4,
    name: "Samsung Galaxy Watch",
    price: 4299000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    description: "Smart watch with health monitoring features",
    category: "Electronics",
    stock: 8
  },
  {
    id: 5,
    name: "Adidas Ultraboost 22",
    price: 2499000,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    description: "Premium running shoes with Boost technology",
    category: "Fashion",
    stock: 12
  },
  {
    id: 6,
    name: "AirPods Pro",
    price: 3799000,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop",
    description: "Wireless earbuds with active noise cancellation",
    category: "Electronics",
    stock: 20
  }
];

class CartStore {
  private state: CartState;

  constructor() {
    this.state = reactive({
      items: [],
      total: 0,
      itemCount: 0
    });
  }

  get items() {
    return this.state.items;
  }

  get total() {
    return computed(() => 
      this.state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    ).value;
  }

  get itemCount() {
    return computed(() => 
      this.state.items.reduce((sum, item) => sum + item.quantity, 0)
    ).value;
  }

  get subtotal() {
    return this.total;
  }

  get tax() {
    return Math.round(this.total * 0.11); // PPN 11%
  }

  get shipping() {
    return this.total > 500000 ? 0 : 50000; // Free shipping untuk pembelian > 500k
  }

  get finalTotal() {
    return this.subtotal + this.tax + this.shipping;
  }

  // Actions
  addToCart(product: Product, quantity: number = 1) {
    const existingItem = this.state.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.state.items.push({
        product,
        quantity
      });
    }
  }

  removeFromCart(productId: number) {
    const index = this.state.items.findIndex(item => item.product.id === productId);
    if (index > -1) {
      this.state.items.splice(index, 1);
    }
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.state.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  clearCart() {
    this.state.items = [];
  }
}

// Export singleton instance
export const cartStore = new CartStore();