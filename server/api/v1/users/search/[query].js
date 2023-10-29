import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { query } = event.context.params

  const { data, error } = await client
    .from('users')
    .select(`*, roles:role_id(*)`)
    .ilike('handle', `${query}%`)
    .limit(10)
  return data
})
