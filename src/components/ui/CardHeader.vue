<template>
  <div :class="cn('space-y-1.5 p-6', $attrs.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>