import { defineStore } from 'pinia'

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
    const { data } = await client.from('connection_requests').upsert({
      target_id: id,
      user_id: user.value.id
    })
    return data
  }

  /* Accept connection */
  const acceptConnection = async (id) => {
    const { error } = await client
      .from('connection_requests')
      .update({ accepted: true })
      .eq('user_id', id)
      .eq('target_id', user.value.id)
    if (error) {
      console.log('Error!!!', error)
    }
  }

  /* Fetch connection requests */
  const fetchConnectionRequests = async () => {
    const { data } = await client
      .from('connection_requests')
      .select('user_id, requester:users!user_id(handle)')
      .eq('target_id', user.value.id)
    return data
  }

  /* Fetch connections */
  const fetchConnections = async (id) => {
    const { data, error } = await client
      .from('connections')
      .select('*, connection:users!friend_id(id, handle)')
      .eq('user_id', id)

    if (error) {
      console.log('Error!!!', error)
    }
    return data
  }

  /* Are we connected? */
  const areConnected = async (id) => {
    const { data } = await client
      .from('connections')
      .select()
      .eq('friend_id', id)
      .eq('user_id', user.value.id)
      .maybeSingle()
  }

  /*  Delete connection */
  const deleteConnection = async (id) => {
    const shouldDelete = confirm('Quieres desconectar seguro?')
    if (!shouldDelete) {
      return
    }
    const { error: error1 } = await client
      .from('connections')
      .delete()
      .eq('friend_id', id)
      .eq('user_id', user.value.id)
  }

  /* Fetch invitations */
  const fetchInvitations = async () => {
    const { data } = await client
      .from('invitations')
      .select()
      .eq('inviter_id', user.value.id)
    return data
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
    const { data } = await client.from('invitations').upsert({
      inviter_id: user.value.id,
      target_email: email,
      created_at: new Date()
    })
    return data
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
