<template>
  <Card class="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
    <!-- Product Image -->
    <div class="relative aspect-square overflow-hidden">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="h-full w-full object-cover transition-transform group-hover:scale-105"
      />
      <!-- Discount Badge -->
      <div class="absolute left-2 top-2 rounded-md bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground">
        -{{ Math.floor(Math.random() * 50) + 10 }}%
      </div>
      <!-- Heart Icon -->
      <Button 
        variant="secondary" 
        size="icon" 
        class="absolute right-2 top-2 h-8 w-8 rounded-full shadow-md"
      >
        ♡
      </Button>
    </div>
    
    <!-- Product Info -->
    <CardContent class="p-3">
      <!-- Product Name -->
      <h3 class="mb-2 line-clamp-2 text-sm font-medium leading-tight">
        {{ product.name }}
      </h3>
      
      <!-- Price -->
      <div class="mb-2 flex items-center space-x-2">
        <span class="text-lg font-bold text-primary">
          {{ formatPrice(Math.floor(product.price * 0.7)) }}
        </span>
        <span class="text-sm text-muted-foreground line-through">
          {{ formatPrice(product.price) }}
        </span>
      </div>
      
      <!-- Rating and Sales -->
      <div class="mb-3 flex items-center justify-between text-xs text-muted-foreground">
        <div class="flex items-center space-x-1">
          <div class="flex text-yellow-400">
            ★★★★★
          </div>
          <span>({{ Math.floor(Math.random() * 1000) + 100 }})</span>
        </div>
        <span>{{ Math.floor(Math.random() * 500) + 50 }} terjual</span>
      </div>
      
      <!-- Location -->
      <div class="mb-3 flex items-center text-xs text-muted-foreground">
        <span class="mr-1">📍</span>
        {{ ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'][Math.floor(Math.random() * 5)] }}
      </div>
      
      <!-- Add to Cart Button -->
      <Button 
        @click="addToCart"
        :disabled="product.stock === 0"
        class="w-full"
        :variant="product.stock === 0 ? 'secondary' : 'default'"
      >
        <span class="mr-2">🛒</span>
        {{ product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang' }}
      </Button>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Product } from '@/types';
import { cartStore } from '@/stores/cartStore';
import { globalNotifications } from '@/composables/useNotifications';
import { formatPrice } from '@/lib/utils';

// UI Components
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Button from '@/components/ui/Button.vue';



interface Props {
  product: Product;
}

const props = defineProps<Props>();

const selectedQuantity = ref(1);

const addToCart = () => {
  cartStore.addToCart(props.product, selectedQuantity.value);
  
  // Show success notification
  globalNotifications.showSuccess(
    'Produk Ditambahkan!',
    `${props.product.name} (${selectedQuantity.value}x) berhasil ditambahkan ke keranjang`
  );
  
  selectedQuantity.value = 1; // Reset quantity after adding
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>