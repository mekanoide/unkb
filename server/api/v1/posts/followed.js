import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

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
    .order('created_at', { ascending: false })
  return data
})
