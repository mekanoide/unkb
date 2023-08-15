import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const requests = ref([])
  const posts = ref([])
  const me = ref(null)
  const contacts = ref([])
  const follows = ref([])
  const requestUrl = ref(null)
  const userSearch = ref(null)

  const followsIds = computed(() => follows.value.map((user) => user.id))

  const getContact = (handle) => {
    return contacts.value.find((user) => user.handle === handle)
  }

  const fetchFollows = async () => {
    const { data: followsData } = await client.from('follows').select().eq('user_id', user.value.id)
    follows.value = followsData
  }

  const fetchPosts = async () => {
    const { data: postsData } = await client
      .from('posts')
      .select('*, users(id, handle)')
      /* .in('author_id', followsIds) */
      .order('created_at', { ascending: false })
    posts.value = postsData
  }

  return {
    requests,
    posts,
    me,
    follows,
    contacts,
    requestUrl,
    followsIds,
    getContact,
    fetchFollows,
    fetchPosts
  }
})
