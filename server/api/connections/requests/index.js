import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)
  const { data } = await client
    .from('connection_requests')
    .select(`user_id, requester:users!user_id(*, roles:role_id(*))`)
    .eq('target_id', user.id)
  return data
})
