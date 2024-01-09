export const useNotificationStore = defineStore('notification', () => {
  const client = useSupabaseClient()
  
  const notifications = ref([])
  const recentPostLink = ref(null)

  /* Start post edition */
  const pushNotification = (msg) => {
    notifications.value.push(msg)
  }

  const dismissNotification = (index) => {
    notifications.value.splice(index, 1)
  }

  return {
    notifications,
    recentPostLink,
    pushNotification,
    dismissNotification
  }
})