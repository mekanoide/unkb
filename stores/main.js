import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const requestUrl = ref('')

  const notifications = ref([])
  const activeUser = ref(null)
  const me = ref(null)
  const userId = ref(null)
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
    me.value = data
    return data
  }

  const fetchUserByHandle = async (handle) => {
    const { data } = await client
      .from('users')
      .select()
      .eq('handle', handle)
      .maybeSingle()
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
    me,
    activeUser,
    userId,
    requestUrl,
    notifications,
    showPopover,
    getContact,
    fetchOwnUser,
    fetchUserByHandle,
    togglePopover
  }
})
