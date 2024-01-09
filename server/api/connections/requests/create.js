import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)

  const { data } = await client.from('connection_requests').upsert({
    target_id: body.id,
    user_id: user.id
  })
  return data
})
