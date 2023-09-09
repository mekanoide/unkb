import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const { auth } = await serverSupabaseClient(event)

  const body = await readBody(event)
  console.log('cuerpo!', body)

  const { error } = await auth.signInWithPassword({
    email: body.email,
    password: body.password,
    options: {
      emailRedirectTo: body.emailRedirectTo
    }
  })
  if (error) {
    console.log('Error!!!', error)
  }
})
