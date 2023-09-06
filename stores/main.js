import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const requestUrl = ref('')

  const notifications = ref([])
  const activeUser = ref(null)
  const contacts = ref([])
  const showPopover = ref('')

  const getContact = (handle) => {
    return contacts.value.find((user) => user.handle === handle)
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
    console.log(data)
    return data
  }

  const fetchUserByHandle = async (handle) => {
    const { data } = await client
      .from('users')
      .select()
      .eq('handle', handle)
      .single()
    return data
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
    notifications,
    showPopover,
    getContact,
    fetchOwnUser,
    fetchRole,
    fetchUserByHandle,
    togglePopover
  }
})
