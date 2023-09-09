import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)
  console.log('cuerpo!', body)

  const { error } = await client.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  })
  console.log('enviado???')
  if (error) {
    return error
  }
})
