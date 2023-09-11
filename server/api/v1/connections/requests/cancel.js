import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)
  console.log('cuerpo!', body)

  const { error } = await client
    .from('connection_requests')
    .delete()
    .eq('target_id', body.id)
    .eq('user_id', user.id)
  return data
})
