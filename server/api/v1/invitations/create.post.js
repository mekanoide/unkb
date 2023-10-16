import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const { data, error } = await client
    .from('invitations')
    .upsert({
      inviter_id: user.id
    })
    .select()
    .single()
  if (error) {
    console.log('error en la consulta')
    console.log(error)
    throw error
  }
  return data
})
