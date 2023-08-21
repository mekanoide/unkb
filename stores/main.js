import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const postBeingEdited = ref(null)

  const postContent = ref('')
  const requests = ref([])
  const posts = ref([])
  const me = ref(null)
  const userId = ref(null)
  const contacts = ref([])
  const follows = ref([])
  const requestUrl = ref(null)
  const userSearch = ref(null)
  const showPopover = ref('')

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
    const { data: postsData, error: postsError } = await client
      .from('posts')
      .select('*, users(id, handle)')
      .in('author_id', followedUserIds)
      .order('created_at', { ascending: false })
    if (postsError) {
      throw postsError
    }
    if (postsData) {
      return postsData
    }
  }

  const fetchConnections = async () => {
    const { data, error } = await client
      .from('connections')
      .select('*, user1:users!user1_id(handle), user2:users!user2_id(handle)')
      .or(`user1_id.eq.${user.value.id},user2_id.eq.${user.value.id}`)

    if (error) {
      throw error
    }
    console.log(data)
    return data
  }

  const fetchPostsFromUser = async (id) => {
    const { data: postsData } = await client
      .from('posts')
      .select('*, users(id, handle)')
      .eq('author_id', id)
      .order('created_at', { ascending: false })
    return postsData
  }

  /* Create new post */
  const createPost = async () => {
    const { data, error } = await client.from('posts').upsert({
      author_id: user.value.id,
      content: postContent.value,
      created_at: new Date()
    })
    if (error) {
      throw error
    }
    postContent.value = ''
    return data
  }

  /* Start post edition */
  const startPostEdition = async (id, content) => {
    const edition = {
      id: id,
      content: content
    }
    postBeingEdited.value = id
    postContent.value = content
  }
  /* Cancel post edition */
  const cancelPostEdition = () => {
    postBeingEdited.value = null
  }

  /* Finish post edition and update post */
  const finishPostEdition = async () => {
    const { data, error } = await client
      .from('posts')
      .update({
        content: postContent.value,
        edited: true
      })
      .eq('id', postBeingEdited.value)
    if (error) {
      throw error
    }
    postContent.value = ''
    postBeingEdited.value = null
    return data
  }

  const deletePost = async (id) => {
    const shouldDelete = confirm('De verdad quieres eliminar esta publicación?')
    if (!shouldDelete) {
      return
    }
    const { error } = await client.from('posts').delete().eq('id', id)
    if (error) {
      throw error
    }
  }

  const togglePopover = (id) => {
    if (showPopover.value !== id) {
      showPopover.value = id
    } else {
      showPopover.value = null
    }
  }

  return {
    postContent,
    postBeingEdited,
    requests,
    posts,
    me,
    userId,
    follows,
    contacts,
    requestUrl,
    showPopover,
    getContact,
    fetchFollows,
    fetchConnections,
    fetchPostsFromFollowedUsers,
    fetchPostsFromUser,
    startPostEdition,
    cancelPostEdition,
    finishPostEdition,
    createPost,
    deletePost,
    togglePopover
  }
})
