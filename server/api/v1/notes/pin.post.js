import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const { data } = await client
    .from('notes')
    .update({
      pinned: !body.pinned
    })
    .eq('id', body.id)
    .select()
    .single()

  return data
})
