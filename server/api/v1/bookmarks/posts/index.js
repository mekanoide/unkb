import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data } = await client
    .from('posts')
    .select()
    .eq('author_id', user.id)
    .eq('scope', 'private')
    .order('created_at', { ascending: false })
  return data
})
