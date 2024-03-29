import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { PAGE_SIZE } from '@/utils/constants'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)
  const query = await getQuery(event)

  const from = query.offset * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data: favs } = await client
    .from('favs')
    .select('post_id')
    .eq('owner_id', user.id)

  const favList = favs.map((item) => item.post_id)

  const { data: follows } = await client
    .from('connections')
    .select()
    .eq('user_id', user.id)

  const followedUserIds = follows.map((item) => item.friend_id)
  followedUserIds.push(user.id)

  const { data: postList } = await client
    .from('posts')
    .select(
      `
        *,
        users: author_id(
          *,
          roles: role_id(*)
        )
      `
    )
    .in('author_id', followedUserIds)
    .neq('scope', 'private')
    .order('created_at', { ascending: false })
    .range(from, to)

  const postsWithFav = postList.map((post) => ({
    ...post,
    fav: favList.includes(post.id)
  }))

  return postsWithFav
})
