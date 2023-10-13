import { getLinks } from '@/utils/getLink'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const link = await getLinks(body.content)

  const payload = {
    author_id: user.id,
    content: body.content,
    link: link
  }
  console.log('payload', payload)
  const { data } = await client
    .from('notes')
    .upsert(payload)
    .select()

  return data
})
