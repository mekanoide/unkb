import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data } = await client
    .from('invitations')
    .select()
    .eq('inviter_id', user.id)
    .order('created_at', { ascending: false })
  return data
})
