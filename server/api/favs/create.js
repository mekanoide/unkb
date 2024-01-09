import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)

  const { data } = await client.from('favs').upsert({
    post_id: body.id,
    owner_id: user.id
  })
  .select()
  return data
})
