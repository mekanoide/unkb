export const searchUserByHandle = async (handle) => {
  const client = useSupabaseClient()
  const { data: user } = await client.from('users').select().textSearch('handle', `${handle}`)
  return user
}
