import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)
  console.log('cuerpo!', body)

  const { error } = await client.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  })
  if (error) {
    return error
  }
})
