import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { PAGE_SIZE } from '@/utils/constants'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)
  const query = getQuery(event)

  const from = query.offset * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data } = await client
    .from('favs')
    .select(
      `
      *,
      posts: post_id(
        *,
        users: author_id(
          *,
          roles: role_id(*)
        )
      )
    `
    )
    .order('created_at', { ascending: false })
    .range(from, to)

  if (data) {
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
