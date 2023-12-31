export const useUserStore = defineStore('user', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const me = ref(null)

  const getUser = async () => {
    if (user.value === null) return
    const { data, error } = await useFetch('/api/v1/user/me')

    return data
  }

  const updateUser = async (payload) => {
    const { data, error } = await useFetch('/api/v1/user/update', {
      method: 'post',
      body: payload
    })
    return { data, error }
  }

  const checkHandle = async (handle) => {
    const response = await useFetch('/api/v1/auth/check-handle', {
      method: 'post',
      body: { handle }
    })
    console.log('response', response)
    return response
  }

  return {
    me,
    getUser,
    updateUser,
    checkHandle
  }
})
