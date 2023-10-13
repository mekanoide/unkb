import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)
  console.log('cuerpo!', body.token)

  const { data } = await client
    .from('invitations')
    .select()
    .eq('token', body.token)
    .maybeSingle()

  return data
})
