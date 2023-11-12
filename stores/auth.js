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
    const { data, error } = await auth.resetPasswordForEmail(email, {
      redirectTo: `${config.public.baseUrl}/new-password`
    })
    if (error) {
      return error
    }
    return data
  }

  const signIn = async (email, password) => {
    console.log('signing in with', email, password)

    const { data, error } = await auth.signInWithPassword({
      email: email,
      password: password
    })
    console.log('data', data)
  }


  const submitNewPassword = async (password) => {
    const { data, error } = await auth.updateUser({
      password: password
    })
    if (error) {
      console.log(error)
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
