import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { post_id } = event.context.params

  const { data } = await client
    .from('replies')
    .select('*, users(*)')
    .eq('post_id', post_id)
    .order('created_at', { ascending: true })
  return data
})
