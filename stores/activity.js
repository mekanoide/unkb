import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const fetchActivity = async () => {
    const { data } = await client
      .from('activity')
      .select()
      .eq('user_id', user.value.id)
    return data
  }

  return {
    fetchActivity
  }
})
