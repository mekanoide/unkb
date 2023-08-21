import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const postBeingEdited = ref(null)
  const postBeingReplied = ref(null)

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

  const fetchOwnUser = async () => {
    const { data } = await client.from('users').select().eq('id', user.value.id).single()
    me.value = data
    return data
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

  const fetchReplies = async (id) => {
    const { data: repliesData } = await client.from('replies').select().eq('post_id', id)
    /* .order('created_at', { ascending: false }) */

    const repliesIds = repliesData.map((item) => item.reply_id)
    const { data: postsData } = await client
      .from('posts')
      .select('*, users(id, handle)')
      .in('id', repliesIds)
      .order('created_at', { ascending: false })
    return postsData
  }

  /* Fetch post */
  const fetchPost = async (id) => {
    const { data } = await client.from('posts').select('*, users(id, handle)').eq('id', id).single()

    console.log('Post data', data)
    return data
  }

  /* Fetch post's author */
  const fetchPostAuthor = async (id) => {
    const { data } = await client
      .from('posts')
      .select('*, users(id, handle)')
      .eq('id', id)
      .single()
    return data.users
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

  /* Create new reply to post */
  const createReply = async (id) => {
    const { data: postData, error: postError } = await client
      .from('posts')
      .upsert({
        author_id: user.value.id,
        content: postContent.value,
        created_at: new Date(),
        reply_to: id
      })
      .select()
      .single()
    if (postError) {
      throw postError
    }
    console.log('Post data', postData)
    const newPostId = postData.id
    const { data: replyData, error: replyError } = await client.from('replies').upsert({
      post_id: id,
      reply_id: newPostId
    })
    if (replyError) {
      throw replyError
    }

    postContent.value = ''
    return replyData
  }

  /* Start post edition */
  const startPostEdition = (id, content) => {
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

  /* Start post edition */
  const startPostReply = (id, content) => {
    const repliedPost = {
      id: id,
      content: content
    }
    postBeingReplied.value = repliedPost
    postContent.value = ''
  }
  /* Cancel post reply */
  const cancelPostReply = () => {
    postBeingEdited.value = null
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
    postBeingReplied,
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
    fetchPost,
    fetchPostAuthor,
    fetchReplies,
    fetchOwnUser,
    startPostEdition,
    cancelPostEdition,
    finishPostEdition,
    startPostReply,
    createPost,
    createReply,
    deletePost,
    togglePopover
  }
})
