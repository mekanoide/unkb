import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const requests = ref([])
  const posts = ref([])
  const contacts = ref([])
  const requestUrl = ref(null)

  const getConnection = (handle) => {
    return contacts.value.find(user => user.handle === handle)
  }

  return { requests, posts, contacts, requestUrl, getConnection }
})