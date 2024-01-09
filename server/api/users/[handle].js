import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const {handle} = event.context.params

  const { data } = await client
    .from('users')
    .select()
    .eq('handle', handle)
    .single()
  return data
})
