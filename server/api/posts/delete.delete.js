import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)

  const { error } = await client.from('posts').delete().eq('id', body.id)
  if (error) {
    return error
  }
})
