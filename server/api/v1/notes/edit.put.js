import { getLinks } from '@/utils/getLink'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const link = await getLinks(body.content)

  const { data } = await client
    .from('notes')
    .update({
      content: body.content,
      link: link
    })
    .eq('id', body.id)
    .select()

  return data
})
