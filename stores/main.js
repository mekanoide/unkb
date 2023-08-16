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
  const showPopover = ref(null)

  const getContact = (handle) => {
    return contacts.value.find((user) => user.handle === handle)
  }

  const fetchFollows = async () => {
    const { data: followsData } = await client.from('follows').select().eq('user_id', user.value.id)
    follows.value = followsData
  }

  const fetchPostsFromFollowedUsers = async () => {
    const { data: followsData, error: followsError } = await client
      .from('follows')
      .select()
      .eq('user_id', user.value.id)

    if (followsError) {
      throw followsError
    }

    const followedUserIds = followsData.map((item) => item.follow_id)
    followedUserIds.push(user.value.id)
    console.log('fetcheando!!!')
    const { data: postsData } = await client
      .from('posts')
      .select('*, users(id, handle)')
      .in('author_id', followedUserIds)
      .order('created_at', { ascending: false })
    return postsData
  }

  const fetchPostsFromUser = async (id) => {
    const { data: postsData } = await client
      .from('posts')
      .select('*, users(id, handle)')
      .eq('author_id', id)
      .order('created_at', { ascending: false })
    return postsData
  }

  const togglePopover = (id) => {
    if (showPopover.value !== id) {
      showPopover.value = id
    } else {
      showPopover.value = null
    }
  }

  return {
    requests,
    posts,
    me,
    follows,
    contacts,
    requestUrl,
    showPopover,
    getContact,
    fetchFollows,
    fetchPostsFromFollowedUsers,
    fetchPostsFromUser,
    togglePopover
  }
})
