import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)
  console.log('cuerpo!', body)

  const { data } = await client.from('invitations').upsert({
    inviter_id: user.id,
    target_email: body.email,
    created_at: new Date()
  })
  return data
})
