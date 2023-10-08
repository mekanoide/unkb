import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data } = await client
    .from('notes')
    .select()
    .eq('pinned', true)
    .order('created_at', { ascending: false })
  return data
})
