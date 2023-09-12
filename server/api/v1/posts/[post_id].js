import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { post_id } = event.context.params

  const { data } = await client
    .from('posts')
    .select('*, users(*)')
    .eq('id', post_id)
    .single()
  return data
})
