import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { PAGE_SIZE } from '@/utils/constants'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const query = getQuery(event)

  const from = query.offset * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, error } = await client
    .from('notes')
    .select()
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    return error
  }
  return data
})
