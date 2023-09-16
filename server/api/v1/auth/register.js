import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)

  const { data: validInvitation, error } = await client
    .from('invitations')
    .select()
    .eq('target_email', body.email)
    .eq('token', body.token)
    .eq('used', false)
    .maybeSingle()

  console.log('Es una invitación válida?', validInvitation)
  return validInvitation
})
