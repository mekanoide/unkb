import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useMainStore()
  const user = useSupabaseUser()
  const { requestUrl } = storeToRefs(store)

  if (!user.value) {
    if (from !== undefined) {
      requestUrl.value = from.path
    }
    return navigateTo('/signin')
  }
})