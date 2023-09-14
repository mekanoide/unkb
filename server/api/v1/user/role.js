import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data: myself } = await client
    .from('users')
    .select('id, role_id, roles()')
    .eq('id', user.id)
    .single()
    console.log('Yo mismo', myself)
  const { data } = await client
    .from('roles')
    .select()
    .eq('id', myself.role_id)
    .single()
  console.log('Mi rol', data)
  return data
})
