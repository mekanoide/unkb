import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { user_id } = event.context.params

  const { data } = await client
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
    .eq('author_id', user_id)
    .neq('scope', 'private')
    .order('created_at', { ascending: false })
  return data
})
