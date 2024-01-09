import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)
  const { data } = await client
    .from('connection_requests')
    .select(
      `
        *,
        users:target_id(
          *,
          roles:role_id(*)
        )
     `
    )
    .eq('user_id', user.id)
  return data
})
