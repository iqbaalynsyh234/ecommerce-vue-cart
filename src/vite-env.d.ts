/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Global notification interface
export interface NotificationData {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration: number;
}

declare global {
  interface Window {
    $showNotification?: (notification: Omit<NotificationData, 'id'>) => void;
  }
}
