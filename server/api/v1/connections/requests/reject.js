import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)
  console.log('cuerpo!', body)

  const { error } = await client
    .from('connection_requests')
    .delete()
    .eq('target_id', user.id)
    .eq('user_id', body.id)
  return data
})
