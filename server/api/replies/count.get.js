import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getQuery(event)

  const { data } = await client.from('replies').select().eq('post_id', query.id)
  return data.length
})
