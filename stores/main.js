export const useMainStore = defineStore('main', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const requestUrl = ref('')

  const activeUser = ref(null)
  const contacts = ref([])
  const showPopover = ref('')
  const showMenu = ref(false)

  const getContact = (handle) => {
    return contacts.value.find((user) => user.handle === handle)
  }

  const getRoleNameById = (id) => {
    const roles = [
      { id: 1, icon: 'ph:pentagram-bold', name: 'demiurgo' },
      { id: 2, icon: false, name: 'arconte' },
      { id: 3, icon: false, name: 'hierofante' },
      { id: 4, icon: false, name: 'neófit' }
    ]
    const role = roles.find((role) => role.id === id)
    return role
  }

  const fetchOwnUser = async () => {
    const { data } = await client
      .from('users')
      .select()
      .eq('id', user.value.id)
      .single()
    return data
  }

  const fetchRole = async () => {
    const { data: myself } = await client
      .from('users')
      .select()
      .eq('id', user.value.id)
      .single()

    const { data } = await client
      .from('roles')
      .select()
      .eq('id', myself.role_id)
      .single()
    return data
  }

  const fetchUserByHandle = async (handle) => {

  }

  const togglePopover = (id) => {
    if (showPopover.value !== id) {
      showPopover.value = id
    } else {
      showPopover.value = null
    }
  }

  return {
    activeUser,
    requestUrl,
    showPopover,
    showMenu,
    getContact,
    fetchOwnUser,
    fetchRole,
    fetchUserByHandle,
    togglePopover,
    getRoleNameById
  }
})
