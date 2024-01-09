export const useUserStore = defineStore('user', () => {
  const loadingUser = ref(false)
  const handle = ref(null)
  const bio = ref(null)
  const colorMode = ref(null)
  const defaultScope = ref(null)

  const fetchUser = async () => {
    loadingUser.value = true
    const { data } = await useFetch('/api/user/me')
    const user = data.value
    handle.value = user.handle
    bio.value = user.bio
    colorMode.value = user.color_mode
    defaultScope.value = user.default_scope
    loadingUser.value = false
  }

  const updateUser = async (payload) => {
    const { data, error } = await useFetch('/api/user/update', {
      method: 'post',
      body: payload
    })
    if (error) {
      return
    }
    handle.value = data.handle
    bio.value = data.bio
    colorMode.value = data.color_mode
    defaultScope.value = data.default_scope
  }

  const deleteAccount = async () => {
    const shouldDelete = confirm('Seguro que quieres eliminar tu cuenta?')
    if (!shouldDelete) {
      return
    }
    const { error } = await auth.delete()
    if (error) {
      return
    }
  }

  const checkIfHandleExists = async (handle) => {
    const response = await useFetch('/api/auth/check-handle', {
      method: 'post',
      body: { handle }
    })
    return response
  }

  return {
    loadingUser,
    handle,
    bio,
    colorMode,
    defaultScope,
    fetchUser,
    updateUser,
    deleteAccount,
    checkIfHandleExists
  }
})
