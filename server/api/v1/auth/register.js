import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)
  console.log('cuerpo!', body)

  const { data, error } = await client.auth.signUp({
    email: body.email,
    password: body.password,
    options: {
      data: {
        handle: body.handle.toLowerCase(),
        parent_id: body.parent
      }
    }
  })
  return data
})
