import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data: bookmarks } = await client.from('bookmarks').select('post_id')

  const favList = bookmarks.map((item) => item.post_id)
  console.log('bookmarks', favList)

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
      users!author_id(*)
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
