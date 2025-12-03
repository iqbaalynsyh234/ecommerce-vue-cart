import { ref } from 'vue';

export interface NotificationItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration: number;
}

const notifications = ref<NotificationItem[]>([]);

export const useNotifications = () => {
  const addNotification = (notification: Omit<NotificationItem, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    notifications.value.push(newNotification);
    
    if (notification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration);
    }
    
    return id;
  };

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  };

  const clearAllNotifications = () => {
    notifications.value = [];
  };

  // Convenience methods
  const showSuccess = (title: string, message: string, duration = 4000) => {
    return addNotification({ type: 'success', title, message, duration });
  };

  const showError = (title: string, message: string, duration = 6000) => {
    return addNotification({ type: 'error', title, message, duration });
  };

  const showWarning = (title: string, message: string, duration = 5000) => {
    return addNotification({ type: 'warning', title, message, duration });
  };

  const showInfo = (title: string, message: string, duration = 4000) => {
    return addNotification({ type: 'info', title, message, duration });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

// Global instance
export const globalNotifications = useNotifications();