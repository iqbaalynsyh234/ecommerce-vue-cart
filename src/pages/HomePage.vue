<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div class="container py-12">
        <div class="flex items-center justify-between">
          <div class="space-y-4">
            <h1 class="text-4xl font-bold tracking-tight">Flash Sale</h1>
            <p class="text-lg opacity-90">Diskon hingga 90% hari ini!</p>
            <Button size="lg" variant="secondary">
              Belanja Sekarang 🛍️
            </Button>
          </div>
          <Card class="bg-background/10 backdrop-blur text-primary-foreground border-0">
            <CardContent class="p-6 text-center">
              <div class="text-3xl font-bold">12:34:56</div>
              <div class="text-sm opacity-75">Berakhir dalam</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
    
    <!-- Categories -->
    <section class="border-b bg-card">
      <div class="container py-6">
        <div class="flex space-x-8 overflow-x-auto">
          <div class="flex flex-col items-center space-y-3 flex-shrink-0">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <span class="text-2xl">📱</span>
            </div>
            <span class="text-sm font-medium">Elektronik</span>
          </div>
          <div class="flex flex-col items-center space-y-3 flex-shrink-0">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <span class="text-2xl">👕</span>
            </div>
            <span class="text-sm font-medium">Fashion</span>
          </div>
          <div class="flex flex-col items-center space-y-3 flex-shrink-0">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span class="text-2xl">🏠</span>
            </div>
            <span class="text-sm font-medium">Home</span>
          </div>
          <div class="flex flex-col items-center space-y-3 flex-shrink-0">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <span class="text-2xl">💄</span>
            </div>
            <span class="text-sm font-medium">Beauty</span>
          </div>
          <div class="flex flex-col items-center space-y-3 flex-shrink-0">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
              <span class="text-2xl">🏃</span>
            </div>
            <span class="text-sm font-medium">Sport</span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Flash Sale Products -->
    <section class="py-12">
      <div class="container space-y-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="rounded-full bg-destructive px-4 py-2 text-sm font-bold text-destructive-foreground">
              ⚡ FLASH SALE
            </div>
            <h2 class="text-3xl font-bold tracking-tight">Produk Pilihan</h2>
          </div>
          <Button variant="link">Lihat Semua →</Button>
        </div>
        <ProductGrid />
      </div>
    </section>
    
    <!-- Recommended Products -->
    <section class="bg-muted/50 py-12">
      <div class="container space-y-8">
        <h2 class="text-3xl font-bold tracking-tight">Rekomendasi Untuk Anda</h2>
        <ProductGrid />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ProductGrid from '@/components/ProductGrid.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
</script>