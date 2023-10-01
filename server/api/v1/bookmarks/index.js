import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data } = await client
    .from('bookmarks')
    .select('*, posts!post_id(*, users!author_id(*))')
    .eq('owner_id', user.id)
    .order('created_at', { foreignTable: 'posts', ascending: false })

  const postsWithFav = data.map((post) => ({
    ...post,
    posts: {
      ...post.posts,
      fav: true
    }
  }))
  return postsWithFav
})
