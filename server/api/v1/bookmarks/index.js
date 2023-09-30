import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data } = await client
    .from('bookmarks')
    .select('*, posts(*, users(*))')
    .eq('owner_id', user.id)
  
    /* const { data } = await client
    .from('posts')
    .select('*, users(*)')
    .in('id', bookmarkList.map((item) => item.post_id))
    .order('created_at', { ascending: false }) */
  
  return data
})
