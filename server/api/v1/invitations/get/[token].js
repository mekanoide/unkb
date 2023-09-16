import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { token } = event.context.params

  const { data } = await client
    .from('invitations')
    .select()
    .eq('token', token)
    .single()
  return data
})
