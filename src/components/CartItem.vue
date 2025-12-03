<template>
  <div class="flex gap-3 py-4 border-b border-gray-100 last:border-b-0">
    <!-- Product Image -->
    <div class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
      <img :src="item.product.image" 
           :alt="item.product.name"
           class="w-full h-full object-cover" />
    </div>
    
    <!-- Product Details -->
    <div class="flex-1 flex flex-col gap-1.5">
      <!-- Name & Price -->
      <h4 class="text-sm font-semibold text-gray-800 line-clamp-2">
        {{ item.product.name }}
      </h4>
      <p class="text-sm font-semibold text-blue-600">
        {{ formatPrice(item.product.price) }}
      </p>
      
      <!-- Controls -->
      <div class="flex justify-between items-center mt-2">
        <!-- Quantity Controls -->
        <div class="flex items-center border border-gray-200 rounded-md overflow-hidden">
          <button 
            class="bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 text-sm font-semibold transition-colors"
            @click="decreaseQuantity"
            :disabled="item.quantity <= 1"
          >
            -
          </button>
          <span class="px-3 py-1.5 bg-white border-x border-gray-200 text-sm font-semibold min-w-[40px] text-center">
            {{ item.quantity }}
          </span>
          <button 
            class="bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 text-sm font-semibold transition-colors"
            @click="increaseQuantity"
            :disabled="item.quantity >= item.product.stock"
          >
            +
          </button>
        </div>
        
        <!-- Remove Button -->
        <button class="p-2 rounded-md hover:bg-red-50 transition-colors group"
                @click="removeItem">
          <svg class="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
      
      <!-- Item Total -->
      <div class="text-sm font-bold text-green-600 mt-auto">
        Total: {{ formatPrice(item.product.price * item.quantity) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '@/types';
import { cartStore } from '@/stores/cartStore';
import { globalNotifications } from '@/composables/useNotifications';

interface Props {
  item: CartItem;
}

const props = defineProps<Props>();

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

const increaseQuantity = () => {
  cartStore.updateQuantity(props.item.product.id, props.item.quantity + 1);
};

const decreaseQuantity = () => {
  cartStore.updateQuantity(props.item.product.id, props.item.quantity - 1);
};

const removeItem = () => {
  const productName = props.item.product.name;
  cartStore.removeFromCart(props.item.product.id);
  
  globalNotifications.showWarning(
    'Item Dihapus',
    `${productName} telah dihapus dari keranjang`
  );
};
</script>