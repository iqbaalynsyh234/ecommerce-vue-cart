<template>
  <div class="min-h-screen flex flex-col relative overflow-x-hidden">
    <!-- Header -->
    <AppHeader @toggle-cart="toggleCart" />
    
    <!-- Main Content -->
    <main class="flex-1 relative z-10">
      <slot />
    </main>
    
    <!-- Footer -->
    <AppFooter />
    
    <!-- Cart Sidebar -->
    <CartSidebar 
      :is-open="isCartOpen"
      @close="closeCart"
      @checkout="openCheckout"
    />
    
    <!-- Checkout Modal -->
    <CheckoutModal 
      :is-visible="isCheckoutOpen"
      @close="closeCheckout"
    />
    
    <!-- Loading Overlay -->
    <LoadingOverlay v-if="isLoading" />
    
    <!-- Notification Toast -->
    <NotificationToast />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/ui/AppFooter.vue';
import CartSidebar from '@/components/CartSidebar.vue';
import CheckoutModal from '@/components/CheckoutModal.vue';
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue';
import NotificationToast from '@/components/ui/NotificationToast.vue';

const isCartOpen = ref(false);
const isCheckoutOpen = ref(false);
const isLoading = ref(false);

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const closeCart = () => {
  isCartOpen.value = false;
};

const openCheckout = () => {
  isCheckoutOpen.value = true;
  isCartOpen.value = false;
};

const closeCheckout = () => {
  isCheckoutOpen.value = false;
};
</script>