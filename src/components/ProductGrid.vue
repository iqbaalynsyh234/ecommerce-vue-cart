<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
    <ProductCard 
      v-for="product in sampleProducts.slice(0, 12)" 
      :key="product.id" 
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue';
import { sampleProducts } from '@/stores/cartStore';
</script>
