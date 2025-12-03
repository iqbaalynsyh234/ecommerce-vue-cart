<template>
  <teleport to="body">
    <div class="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full">
      <transition-group name="notification" tag="div">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'bg-white rounded-xl shadow-2xl p-4 flex items-start gap-3 relative overflow-hidden cursor-pointer transition-all duration-300 backdrop-blur-md border border-white/20 hover:-translate-y-1 hover:shadow-3xl',
            {
              'border-l-4 border-l-green-500': notification.type === 'success',
              'border-l-4 border-l-red-500': notification.type === 'error', 
              'border-l-4 border-l-yellow-500': notification.type === 'warning',
              'border-l-4 border-l-blue-500': notification.type === 'info'
            }
          ]"
          @click="removeNotification(notification.id)"
        >
          <!-- Icon -->
          <div class="flex-shrink-0 mt-0.5"
               :class="{
                 'text-green-500': notification.type === 'success',
                 'text-red-500': notification.type === 'error',
                 'text-yellow-500': notification.type === 'warning', 
                 'text-blue-500': notification.type === 'info'
               }">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="notification.type === 'success'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              <path v-else-if="notification.type === 'error'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              <path v-else-if="notification.type === 'warning'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-gray-800 text-sm mb-1">{{ notification.title }}</div>
            <div class="text-gray-600 text-sm leading-relaxed">{{ notification.message }}</div>
          </div>
          
          <!-- Close Button -->
          <button class="flex-shrink-0 p-1 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                  @click.stop="removeNotification(notification.id)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <!-- Progress Bar -->
          <div class="absolute bottom-0 left-0 h-1 w-full bg-current opacity-20 origin-left animate-notification-progress"
               :style="{ animationDuration: `${notification.duration}ms` }"
               :class="{
                 'text-green-500': notification.type === 'success',
                 'text-red-500': notification.type === 'error',
                 'text-yellow-500': notification.type === 'warning',
                 'text-blue-500': notification.type === 'info'
               }">
          </div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { globalNotifications } from '@/composables/useNotifications';

const { notifications, removeNotification } = globalNotifications;
</script>