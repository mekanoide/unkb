export const useConnectionsStore = defineStore('connections', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const requests = ref([])
  const contacts = ref([])

  const getContact = (handle) => {
    return contacts.value.find((user) => user.handle === handle)
  }

  /* Check if users are connected */
  const areWeConnected = async (id) => {
    const { data, error } = await client
      .from('connections')
      .select()
      .eq('user_id', user.value.id)
      .eq('friend_id', id)
      .maybeSingle()
    if (data) {
      return true
    }
    return false
  }

  /* Request connection */
  const sendConnectionRequest = async (id) => {
  }

  /* Accept connection */
  const acceptConnection = async (id) => {
  }

  /* Fetch connection requests */
  const fetchConnectionRequests = async () => {

  }

  /* Fetch connections */
  const fetchConnections = async (id) => {
  }

  /*  Delete connection */
  const deleteConnection = async (id) => {
    const shouldDelete = confirm('Quieres desconectar seguro?')
    if (!shouldDelete) {
      return
    }
    await useFetch('/api/v1/connections/delete', {
      method: 'delete',
      body: {
        id: id
      }
    })
    if (error) {
      console.log('Error!!!', error)
    }
  }

  /* Fetch invitations */
  const fetchInvitations = async () => {
  }

  const fetchInviter = async (id) => {
    const { data } = await client
      .from('users')
      .select()
      .eq('invitation_token', id)
      .single()
    return data
  }

  /* Create invitation */
  const createInvitation = async (email) => {

  }
  /* Cancel pending invitation */
  const cancelInvitation = async (email) => {
    const shouldCancel = confirm('De verdad quieres cancelar esta invitación?')
    if (!shouldCancel) {
      return
    }
    const { error } = await client
      .from('invitations')
      .delete()
      .eq('target_email', email)
    if (error) {
      console.log('Error!!!', error)
    }
  }

  return {
    requests,
    contacts,
    getContact,
    areWeConnected,
    sendConnectionRequest,
    acceptConnection,
    fetchInviter,
    createInvitation,
    fetchInvitations,
    cancelInvitation,
    fetchConnections,
    fetchConnectionRequests,
    deleteConnection
  }
})
