<template>
  <div class="fixed inset-0 z-50 transition-all duration-300" 
       :class="isOpen ? 'pointer-events-auto' : 'pointer-events-none'">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/50 transition-opacity duration-300"
         :class="isOpen ? 'opacity-100' : 'opacity-0'"
         @click="closeCart" 
         v-if="isOpen"></div>
    
    <!-- Sidebar Content -->
    <div class="absolute top-0 right-0 w-96 max-w-full h-full bg-white shadow-2xl transform transition-transform duration-300 flex flex-col"
         :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
      
      <!-- Header -->
      <div class="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50">
        <h2 class="text-xl font-semibold text-gray-800">Keranjang Belanja</h2>
        <button class="p-1 rounded-md hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800"
                @click="closeCart">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Body -->
      <div class="flex-1 overflow-y-auto p-5">
        <!-- Empty Cart -->
        <div v-if="cartStore.items.length === 0" class="text-center py-16 px-5">
          <div class="text-gray-400 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m0 0L9 21h6"></path>
            </svg>
          </div>
          <p class="text-gray-600 text-lg mb-6">Keranjang belanja Anda kosong</p>
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  @click="closeCart">
            Lanjutkan Belanja
          </button>
        </div>
        
        <!-- Cart Items -->
        <div v-else>
          <div class="space-y-4 mb-6">
            <CartItem 
              v-for="item in cartStore.items" 
              :key="item.product.id"
              :item="item"
            />
          </div>
          
          <!-- Summary -->
          <div class="bg-gray-50 p-4 rounded-xl mb-6">
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal:</span>
                <span class="font-medium">{{ formatPrice(cartStore.subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Pajak (PPN 11%):</span>
                <span class="font-medium">{{ formatPrice(cartStore.tax) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Ongkir:</span>
                <span class="font-medium">
                  {{ cartStore.shipping === 0 ? 'GRATIS' : formatPrice(cartStore.shipping) }}
                </span>
              </div>
              
              <!-- Free Shipping Info -->
              <div v-if="cartStore.shipping === 0" 
                   class="bg-green-500 text-white p-2 rounded-lg text-center text-xs font-medium">
                🚚 Gratis ongkir untuk pembelian di atas Rp 500.000
              </div>
              
              <hr class="border-gray-300 my-3">
              
              <div class="flex justify-between text-lg font-bold text-blue-600">
                <span>Total:</span>
                <span>{{ formatPrice(cartStore.finalTotal) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="space-y-3">
            <button class="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    @click="clearCart">
              Kosongkan Keranjang
            </button>
            <button class="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-bold text-lg transition-colors"
                    @click="checkout">
              Checkout ({{ cartStore.itemCount }} item)
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartItem from '@/components/CartItem.vue';
import { cartStore } from '@/stores/cartStore';
import { globalNotifications } from '@/composables/useNotifications';

interface Props {
  isOpen: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
  checkout: [];
}>();

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

const closeCart = () => {
  emit('close');
};

const clearCart = () => {
  if (confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
    cartStore.clearCart();
    globalNotifications.showInfo(
      'Keranjang Dikosongkan',
      'Semua item telah dihapus dari keranjang belanja'
    );
  }
};

const checkout = () => {
  emit('checkout');
};
</script>