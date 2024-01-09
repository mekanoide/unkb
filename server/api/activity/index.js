import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data } = await client
    .from('activity')
    .select('*, users!target_id(handle), posts!post_id(content)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  return data
})
