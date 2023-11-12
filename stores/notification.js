export const useNotificationStore = defineStore('notification', () => {
  const client = useSupabaseClient()
  
  const notifications = ref([])

  return {
    notifications
  }
})