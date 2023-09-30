import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data: bookmarks } = await client
    .from('bookmarks')
    .select('post_id')
    .eq('owner_id', user.id)

  const { data: follows } = await client
    .from('connections')
    .select()
    .eq('user_id', user.id)

  const followedUserIds = follows.map((item) => item.friend_id)
  followedUserIds.push(user.id)

  const { data } = await client
    .from('posts')
    .select('*, users(*)')
    .in('author_id', followedUserIds)
    .neq('scope', 'private')
    .order('created_at', { ascending: false })
  return data
})


/* const userFollowedPosts = await supabase
  .from('bookmarks')
  .select('post_id')
  .eq('user_id', userId)

// Paso 2: Extraer los IDs de los Posts
const followedPostIds = userFollowedPosts.data.map(
  (bookmark) => bookmark.post_id
)

// Paso 3: Obtener Todos los Posts
const allPosts = await supabase.from('posts').select('*')

// Paso 4: Marcar los Posts Seguidos
const postsWithFav = allPosts.data.map((post) => ({
  ...post,
  fav: followedPostIds.includes(post.id)
}))
 */