import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)
  const body = await readBody(event)

  const { data } = await client
    .from('users')
    .update({
      handle: body.handle,
      bio: body.bio
    })
    .eq('id', user.id)
    .select()
    .single()

  return data
})
