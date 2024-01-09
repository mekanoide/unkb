import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { user_id } = event.context.params

  if (user_id === user.id) {
    return 'myself'
  }

  const { data: connection, error } = await client
    .from('connections')
    .select()
    .eq('user_id', user.id)
    .eq('friend_id', user_id)
    .maybeSingle()
  if (connection) {
    return 'connected'
  }

  const { data: requested, error: requestError } = await client
    .from('connection_requests')
    .select()
    .eq('user_id', user.id)
    .eq('target_id', user_id)
    .maybeSingle()
  if (requested) {
    return 'requested'
  }

  const { data: received, error: receivedError } = await client
    .from('connection_requests')
    .select()
    .eq('user_id', user_id)
    .eq('target_id', user.id)
    .maybeSingle()
  if (received) {
    return 'received'
  }

  return 'not_connected'
})
