import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data } = await client
    .from('favs')
    .select(`
      *,
      posts: post_id(
        *,
        users: author_id(
          *,
          roles: role_id(*)
        )
      )
    `)
    .order('created_at', { ascending: false })

  if(data) {  
    const postsWithFav = data.map((post) => ({
      ...post,
      posts: {
        ...post.posts,
        fav: true
      }
    }))
    return postsWithFav
  }
})