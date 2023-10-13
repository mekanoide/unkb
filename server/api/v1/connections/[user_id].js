import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { user_id } = event.context.params
  const { data, error } = await client
    .from('connections')
    .select(
      `
        *,
        users: friend_id(
          *,
          roles: role_id(name)
        )
      `
    )
    .eq('user_id', user_id)

  if (error) {
    console.log('Error!!!', error)
  }
  return data
})
