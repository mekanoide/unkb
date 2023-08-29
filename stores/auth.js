import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()
  const { auth } = useSupabaseAuthClient()

  const signUp = async (handle, email, password, parent) => {
    console.log('Parent', parent)
    const { data, error } = await auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          handle: handle,
          parent_id: parent
        }
      }
    })
    return data
  }
  return {
    signUp
  }
})
