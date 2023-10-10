import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { post_id } = event.context.params

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
    .eq('id', post_id)
    .single()
  console.log('post', data)
  return data
})
