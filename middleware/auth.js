export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  const router = useRouter()

  if (!user.value) {
    router.push('/access')
  }
})