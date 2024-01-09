import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { token } = event.context.params

  const { data, error } = await client
    .from('users')
    .select('id, invitation_token')
    .eq('invitation_token', token)
    .maybeSingle()
  if (error) {
    throw error
  }
  return data
})
