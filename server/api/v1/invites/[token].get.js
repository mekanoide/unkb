import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { token } = event.context.params

  console.log('token de la invitación!!!', token)

  const { data, error } = await client
    .from('invites')
    .select()
    .eq('token', token)
    .eq('used', false)
    .maybeSingle()
  
  if (error) {
    console.log('error en la consulta')
    console.log(error)
    throw error
  }
  console.log('invitación chequeada')
  console.log('datos de la invitación!!!', data)
  return data
})
