import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data: favs } = await client
    .from('favs')
    .select('post_id')
    .eq('owner_id', user.id)

  const favList = favs.map((item) => item.post_id)
  console.log('favs', favList)

  const { data: follows } = await client
    .from('connections')
    .select()
    .eq('user_id', user.id)

  console.log('follows', follows)

  const followedUserIds = follows.map((item) => item.friend_id)
  followedUserIds.push(user.id)

  console.log('followedUserIds', followedUserIds)

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

  console.log('posts', postList)

  const postsWithFav = postList.map((post) => ({
    ...post,
    fav: favList.includes(post.id)
  }))

  return postsWithFav
})
