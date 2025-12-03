<template>
  <div class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in"
       v-if="visible">
    
    <!-- Main Loading Content -->
    <div class="text-center text-white relative z-10">
      <!-- Spinner -->
      <div class="relative w-20 h-20 mx-auto mb-8">
        <div class="absolute inset-0 border-3 border-transparent border-t-pink-400 rounded-full animate-spin"></div>
        <div class="absolute inset-0 border-3 border-transparent border-t-blue-500 rounded-full animate-spin scale-80 animation-delay-500"></div>
        <div class="absolute inset-0 border-3 border-transparent border-t-purple-500 rounded-full animate-spin scale-60 animation-delay-1000"></div>
      </div>
      
      <!-- Text -->
      <div class="space-y-3">
        <h3 class="text-2xl font-semibold gradient-text">{{ title }}</h3>
        <p class="text-white/80">{{ message }}</p>
      </div>
    </div>
    
    <!-- Floating Dots Animation -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 pointer-events-none">
      <div v-for="n in 20" 
           :key="n"
           class="absolute w-1 h-1 bg-pink-400/60 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-dot-float"
           :style="getDotStyle(n)">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  visible?: boolean;
  title?: string;
  message?: string;
}

withDefaults(defineProps<Props>(), {
  visible: false,
  title: 'Memuat...',
  message: 'Mohon tunggu sebentar'
});

const getDotStyle = (index: number) => {
  const delay = index * 0.1;
  const x = Math.cos((index * 360) / 20 * Math.PI / 180) * 100;
  const y = Math.sin((index * 360) / 20 * Math.PI / 180) * 100;
  
  return {
    '--delay': `${delay}s`,
    '--x': `${x}px`,
    '--y': `${y}px`
  };
};
</script>