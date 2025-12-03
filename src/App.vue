<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomePage from '@/pages/HomePage.vue';
</script>

<template>
  <div id="app">
    <DefaultLayout>
      <HomePage />
    </DefaultLayout>
  </div>
</template>

<style>
#app {
  width: 100%;
  min-height: 100vh;
}
</style>
