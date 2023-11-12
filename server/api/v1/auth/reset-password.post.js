import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)
  const config = useRuntimeConfig()

  const body = await readBody(event)
  console.log('cuerpo!', body)

  const { data, error } = await client.auth.resetPasswordForEmail(body.email, {
    redirectTo: `${config.public.baseUrl}/new-password`
  })

  console.log('enviado???', data)
  if (error) {
    return error
  }
  return data
})
