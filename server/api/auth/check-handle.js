import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)

  const namePattern = /^[a-z0-9_]+$/
  if (!namePattern.test(body.handle)) {
    return
  }
  const { data } = await client
    .from('users')
    .select('handle')
    .eq('handle', body.handle)
    .maybeSingle()
  if (data) {
    return 'Lo siento, el nombre ya está pillado.'
  }
})
