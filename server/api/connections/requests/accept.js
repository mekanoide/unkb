import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)

  const { error } = await client
    .from('connection_requests')
    .update({ accepted: true })
    .eq('user_id', body.id)
    .eq('target_id', user.id)
})
