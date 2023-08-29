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
      throw error
    }
    return data
  }

  const makeConnection = async (id) => {
    const { data: connection1, error: error1 } = await client
      .from('connections')
      .upsert({ user_id: user.value.id, friend_id: id, created_at: new Date() })
    if (error1) {
      throw error1
    }
    const { data: connection2, error: error2 } = await client
      .from('connections')
      .upsert({ user_id: id, friend_id: user.value.id, created_at: new Date() })
    if (error2) {
      throw error2
    }
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

    const { error: error2 } = await client
      .from('connections')
      .delete()
      .eq('user_id', id)
      .eq('friend_id', user.value.id)
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
    console.log('Correo a eliminar', email)
    const { error } = await client
      .from('invitations')
      .delete()
      .eq('target_email', email)
    if (error) {
      throw error
    }
  }

  return {
    requests,
    contacts,
    getContact,
    areWeConnected,
    sendConnectionRequest,
    fetchInviter,
    createInvitation,
    cancelInvitation,
    makeConnection,
    fetchConnections,
    fetchConnectionRequests,
    deleteConnection
  }
})
