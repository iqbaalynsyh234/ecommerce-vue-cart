<template>
  <!-- Top Banner -->
  <div class="bg-primary text-primary-foreground text-center py-2 text-sm">
    Gratis Ongkir untuk pembelian minimal Rp50.000 ✨
  </div>
  
  <header class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <!-- Main Header -->
    <div class="container flex h-16 items-center">
      <!-- Logo -->
      <div class="mr-8">
        <h1 class="text-2xl font-bold text-primary">
          🛍️ ShopVue
        </h1>
      </div>
      
      <!-- Search Bar -->
      <div class="flex flex-1 items-center space-x-4">
        <div class="relative flex-1 max-w-2xl">
          <Input
            type="search"
            placeholder="Cari produk, brand, atau toko..."
            class="pl-4 pr-12"
            v-model="searchQuery"
          />
          <Button 
            size="sm" 
            class="absolute right-1 top-1/2 h-8 -translate-y-1/2 px-3"
          >
            🔍
          </Button>
        </div>
      </div>
      
      <!-- User Actions -->
      <div class="ml-8 flex items-center space-x-4">
        <!-- Cart -->
        <Button 
          variant="ghost" 
          size="sm" 
          @click="toggleCart"
          class="relative"
        >
          <span class="text-lg">🛒</span>
          <span 
            v-if="cartStore.itemCount > 0"
            class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground"
          >
            {{ cartStore.itemCount }}
          </span>
        </Button>
        
        <!-- User Menu -->
        <div class="flex flex-col items-center text-sm">
          <Button variant="ghost" size="sm">Masuk</Button>
        </div>
      </div>
    </div>
    
    <!-- Navigation Menu -->
    <div class="border-t">
      <div class="container">
        <nav class="flex space-x-6 py-3 text-sm font-medium">
          <a href="#" class="transition-colors hover:text-primary">
            ⚡ Flash Sale
          </a>
          <a href="#" class="transition-colors hover:text-primary">
            🎫 Voucher
          </a>
          <a href="#" class="transition-colors hover:text-primary">
            🚚 Gratis Ongkir
          </a>
          <a href="#" class="transition-colors hover:text-primary">
            🏢 Mall
          </a>
          <a href="#" class="transition-colors hover:text-primary">
            📱 Handphone
          </a>
          <a href="#" class="transition-colors hover:text-primary">
            👨 Fashion Pria
          </a>
          <a href="#" class="transition-colors hover:text-primary">
            👩 Fashion Wanita
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { cartStore } from '@/stores/cartStore';
import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/Input.vue';

const searchQuery = ref('');

const emit = defineEmits<{
  toggleCart: [];
}>();

const toggleCart = () => {
  emit('toggleCart');
};
</script>

