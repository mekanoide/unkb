import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)
  console.log('cuerpo!', body)

  const { error } = await client
    .from('posts')
    .update({
      scope: 'connections'
    })
    .eq('id', body.id)
  if (error) {
    return error
  }
})
