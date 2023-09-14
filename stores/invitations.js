import { defineStore } from 'pinia'

export const useInvitationsStore = defineStore('invitations', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const fetchInvitations = async () => {

    return data
  }

  return {
    fetchInvitations
  }
})
