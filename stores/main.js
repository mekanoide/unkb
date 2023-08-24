import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const postBeingEdited = ref(null)
  const postBeingReplied = ref(null)

  const postContent = ref('')

  const requests = ref([])
  const posts = ref([])
  const post = ref(null)
  const activeUser = ref(null)
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

  const fetchUserByHandle = async (handle) => {
    const { data, error } = await client.from('users').select().eq('handle', handle).maybeSingle()
    if (error) {
      throw error
    }
    activeUser.value = data
  }

  const fetchFollows = async () => {
    const { data: followsData } = await client.from('follows').select().eq('user_id', user.value.id)
    follows.value = followsData
  }

  /* Fetch active post */
  const fetchPost = async (id) => {
    const { data } = await client.from('posts').select('*, users(id, handle)').eq('id', id).single()
    post.value = data
  }

  /* Fetch posts from followed users */
  const fetchPostsFromFollowedUsers = async () => {
    const { data: followsData } = await client.from('follows').select().eq('user_id', user.value.id)

    const followedUserIds = followsData.map((item) => item.follow_id)
    followedUserIds.push(user.value.id)

    const { data: postsData } = await client
      .from('posts')
      .select('*, users(id, handle)')
      .in('author_id', followedUserIds)
      .order('created_at', { ascending: false })
    posts.value = postsData
  }

  /* Request connection */
  const sendConnectionRequest = async (id) => {
    const { data: connectionData, error: connectionError } = await client
      .from('connection_requests')
      .upsert({
        target_id: id,
        user_id: user.value.id
      })
    return connectionData
  }

  /* Fetch connection requests */
  const fetchConnectionRequests = async () => {
    const { data, error } = await client
      .from('connection_requests')
      .select('user_id, requester:users!user_id(handle)')
      .eq('target_id', user.value.id)
    console.log('Request!!!', data)
    return data
  }

  /* Fetch connections */
  const fetchConnections = async () => {
    const { data, error } = await client
      .from('connections')
      .select('*, connection:users!friend_id(id, handle)')

    if (error) {
      throw error
    }
    return data
  }
  /*  Delete connection */
  const deleteConnection = async (id) => {
    const shouldDelete = confirm('Quieres desconectar seguro?')
    if (!shouldDelete) {
      return
    }
    const { error: error1 } = await client
      .from('connections')
      .delete()
      .eq('friend_id', id)
      .eq('user_id', user.value.id)

    const { error: error2 } = await client
      .from('connections')
      .delete()
      .eq('user_id', id)
      .eq('friend_id', user.value.id)

    if (error1) {
      throw error1
    }

    if (error2) {
      throw error2
    }
  }

  /* Fetch posts from user */
  const fetchPostsFromUser = async (id) => {
    const { data } = await client
      .from('posts')
      .select('*, users(id, handle)')
      .eq('author_id', id)
      .order('created_at', { ascending: false })
    return data
  }

  /* fetch replies */
  const fetchReplyCount = async (id) => {
    const { data } = await client.from('replies').select().eq('post_id', id)
    return data.length
  }

  const fetchReplies = async (id) => {
    const { data: repliesData } = await client.from('replies').select().eq('post_id', id)
    /* .order('created_at', { ascending: false }) */

    const repliesIds = repliesData.map((item) => item.reply_id)
    const { data: postsData } = await client
      .from('posts')
      .select('*, users(id, handle)')
      .in('id', repliesIds)
      .order('created_at', { ascending: true })
    posts.value = postsData
  }

  /* Fetch post's author */
  const fetchPostAuthor = async (id) => {
    const { data } = await client.from('posts').select('*, users(id, handle)').eq('id', id).single()
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
    post,
    me,
    activeUser,
    userId,
    follows,
    contacts,
    requestUrl,
    showPopover,
    getContact,
    sendConnectionRequest,
    fetchFollows,
    fetchConnections,
    fetchConnectionRequests,
    deleteConnection,
    fetchPostsFromFollowedUsers,
    fetchPostsFromUser,
    fetchPost,
    fetchPostAuthor,
    fetchReplies,
    fetchReplyCount,
    fetchOwnUser,
    fetchUserByHandle,
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
