import { serverSupabaseClient } from '#supabase/server'
import { PAGE_SIZE } from '@/utils/constants'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getQuery(event)

  const from = query.offset * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data: ideas } = await client
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
    .eq('scope', 'private')
    .order('created_at', { ascending: false })
    .range(from, to)

  return ideas
})
