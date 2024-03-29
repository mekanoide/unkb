export const useAuthStore = defineStore('auth', () => {
  const { auth } = useSupabaseClient()
  const user = useSupabaseUser()
  const config = useRuntimeConfig()

  const register = async (handle, email, password, parent) => {
    const { data, error } = await auth.signUp({
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

  const resetPassword = async (email) => {

  }

  const signIn = async (email, password) => {

    const { data, error } = await auth.signInWithPassword({
      email: email,
      password: password
    })
  }


  const submitNewPassword = async (password) => {
    const { data, error } = await auth.updateUser({
      password: password
    })
    if (error) {
      return error
    }
    return data
  }

  return {
    register,
    signIn,
    submitNewPassword,
    resetPassword
  }
})
