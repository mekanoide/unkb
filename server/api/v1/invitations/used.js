import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data } = await client
    .from('invitations')
    .select()
    .eq('invitationr_id', user.id)
    .eq('used', true)
    .order('created_at', { ascending: false })
  return data
})
