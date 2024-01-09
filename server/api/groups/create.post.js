import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)

  const { data, error } = await client
    .from('groups')
    .upsert({
      name: body.name,
      description: body.description || null,
      open: body.open || true
    })
    .select()
  
  if (error) {
    return error
  }
  return data
})
