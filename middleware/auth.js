import { useMainStore } from '@/stores/main'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useMainStore()
  const user = useSupabaseUser()
  const router = useRouter()

  if (!user.value) {
    if (from !== undefined) {
      store.requestUrl = from.path
    }
    return navigateTo('/access')
  }
})