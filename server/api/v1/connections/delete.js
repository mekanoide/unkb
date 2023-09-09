import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)
  console.log('cuerpo!', body)

  const shouldDelete = confirm('Quieres desconectar seguro?')
  if (!shouldDelete) {
    return
  }
  const { error } = await client
    .from('connections')
    .delete()
    .eq('friend_id', body.id)
    .eq('user_id', user.id)
})
