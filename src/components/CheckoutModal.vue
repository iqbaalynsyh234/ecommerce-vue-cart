<template>
  <div class="fixed inset-0 bg-black/50 flex items-start justify-center p-5 z-50 overflow-y-auto" 
       v-if="isVisible" 
       @click="closeModal">
    
    <div class="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
         @click.stop>
      
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <h2 class="text-2xl font-bold text-gray-800">Checkout</h2>
        <button class="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                @click="closeModal">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Body -->
      <div class="p-6">
        <!-- Order Summary -->
        <div class="bg-gray-50 p-5 rounded-xl mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Ringkasan Pesanan</h3>
          
          <!-- Order Items -->
          <div class="space-y-2 mb-4">
            <div v-for="item in cartStore.items" :key="item.product.id" 
                 class="flex justify-between text-sm">
              <span class="text-gray-700">{{ item.product.name }} ({{ item.quantity }}x)</span>
              <span class="font-medium">{{ formatPrice(item.product.price * item.quantity) }}</span>
            </div>
          </div>
          
          <!-- Totals -->
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
            
            <hr class="border-gray-300 my-3">
            
            <div class="flex justify-between text-lg font-bold text-blue-600">
              <span>Total Pembayaran:</span>
              <span>{{ formatPrice(cartStore.finalTotal) }}</span>
            </div>
          </div>
        </div>
        
        <!-- Checkout Form -->
        <form @submit.prevent="processOrder" class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Informasi Pengiriman</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Full Name -->
              <div class="md:col-span-2">
                <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap *
                </label>
                <input 
                  type="text" 
                  id="fullName" 
                  v-model="orderForm.fullName" 
                  required 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              
              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="orderForm.email" 
                  required 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              
              <!-- Phone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon *
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="orderForm.phone" 
                  required 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              
              <!-- Address -->
              <div class="md:col-span-2">
                <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Lengkap *
                </label>
                <textarea 
                  id="address" 
                  v-model="orderForm.address" 
                  required 
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                ></textarea>
              </div>
              
              <!-- City -->
              <div>
                <label for="city" class="block text-sm font-medium text-gray-700 mb-2">
                  Kota *
                </label>
                <input 
                  type="text" 
                  id="city" 
                  v-model="orderForm.city" 
                  required 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              
              <!-- Postal Code -->
              <div>
                <label for="postalCode" class="block text-sm font-medium text-gray-700 mb-2">
                  Kode Pos *
                </label>
                <input 
                  type="text" 
                  id="postalCode" 
                  v-model="orderForm.postalCode" 
                  required 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>
          </div>
          
          <!-- Payment Methods -->
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Metode Pembayaran</h3>
            
            <div class="space-y-3">
              <!-- Bank Transfer -->
              <label class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-gray-50 transition-colors">
                <input type="radio" value="transfer" v-model="orderForm.paymentMethod" 
                       class="w-4 h-4 text-blue-600" />
                <div>
                  <div class="font-medium text-gray-800">Transfer Bank</div>
                  <div class="text-sm text-gray-600">BCA, Mandiri, BNI, BRI</div>
                </div>
              </label>
              
              <!-- E-Wallet -->
              <label class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-gray-50 transition-colors">
                <input type="radio" value="ewallet" v-model="orderForm.paymentMethod" 
                       class="w-4 h-4 text-primary-600" />
                <div>
                  <div class="font-medium text-gray-800">E-Wallet</div>
                  <div class="text-sm text-gray-600">GoPay, OVO, DANA, ShopeePay</div>
                </div>
              </label>
              
              <!-- COD -->
              <label class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-gray-50 transition-colors">
                <input type="radio" value="cod" v-model="orderForm.paymentMethod" 
                       class="w-4 h-4 text-primary-600" />
                <div>
                  <div class="font-medium text-gray-800">Bayar di Tempat (COD)</div>
                  <div class="text-sm text-gray-600">Bayar saat barang diterima</div>
                </div>
              </label>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex flex-col md:flex-row gap-4 md:justify-end">
            <button type="button" 
                    class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                    @click="closeModal">
              Batal
            </button>
            <button type="submit" 
                    class="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                    :disabled="isProcessing">
              {{ isProcessing ? 'Memproses...' : 'Konfirmasi Pesanan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { cartStore } from '@/stores/cartStore';
import { globalNotifications } from '@/composables/useNotifications';

interface Props {
  isVisible: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const isProcessing = ref(false);

const orderForm = reactive({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  paymentMethod: 'transfer'
});

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

const closeModal = () => {
  emit('close');
};

const processOrder = async () => {
  isProcessing.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderNumber = 'ORD-' + Date.now();
    
    // Show success notification
    globalNotifications.showSuccess(
      'Pesanan Berhasil Dibuat!',
      `Nomor Pesanan: ${orderNumber}. Terima kasih telah berbelanja di ShopVue!`,
      6000
    );
    
    // Reset form and cart
    Object.assign(orderForm, {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      paymentMethod: 'transfer'
    });
    
    cartStore.clearCart();
    closeModal();
    
  } catch (error) {
    globalNotifications.showError(
      'Kesalahan Checkout',
      'Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.',
      5000
    );
  } finally {
    isProcessing.value = false;
  }
};
</script>