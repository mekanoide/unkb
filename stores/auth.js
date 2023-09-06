import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const register = async (handle, email, password, parent) => {
    const { data, error } = await client.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          handle: handle.toLowerCase(),
          parent_id: parent
        }
      }
    })
    return data
  }
  return {
    register
  }
})
