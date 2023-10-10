export const useUserStore = defineStore('user', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const me = ref(null)

  const initialize = async () => {
    if (me.value) return
    if(user.value === null) return
    const { data } = await client
      .from('users')
      .select()
      .eq('id', user.value.id)
      .single()
    me.value = data
  }

  return {
    me,
    initialize
  }
})