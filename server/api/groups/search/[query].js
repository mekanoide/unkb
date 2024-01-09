import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { query } = event.context.params

  const { data, error } = await client
    .from('groups')
    .select()
    .ilike('name', `${query}%`)
    .limit(10)
  return data
})
