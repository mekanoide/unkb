import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const postBeingEdited = ref(null)
  const postBeingReplied = ref(null)
  const postContent = ref('')

  /* Fetch active post */
  const fetchPost = async (id) => {
    const { data } = await client
      .from('posts')
      .select('*, users(id, handle)')
      .eq('id', id)
      .single()
    return data
  }

  /* Fetch posts from followed users */
  const fetchPostsFromFollowedUsers = async () => {
    const { data: follows } = await client
      .from('connections')
      .select()
      .eq('user_id', user.value.id)
    const followedUserIds = follows.map((item) => item.friend_id)
    followedUserIds.push(user.value.id)

    const { data } = await client
      .from('posts')
      .select('*, users(id, handle)')
      .in('author_id', followedUserIds)
      /* .eq('reply_to', null) */
      .order('created_at', { ascending: false })
    return data
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
    const { data } = await client
      .from('replies')
      .select('*, users(id, handle)')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
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
      .from('replies')
      .upsert({
        author_id: user.value.id,
        content: postContent.value,
        created_at: new Date(),
        post_id: id
      })
      .select()
      .single()
    if (postError) {
      throw postError
    }
    postContent.value = ''
    return postData
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
  const finishPostEdition = async (type) => {
    if (type === 'reply') {
      const { data, error } = await client
        .from('replies')
        .update({
          content: postContent.value,
          edited: true
        })
        .eq('id', postBeingEdited.value)
        .select()
      if (error) {
        throw error
      }
      postContent.value = ''
      postBeingEdited.value = null
      return data
    }

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

  return {
    postContent,
    postBeingEdited,
    postBeingReplied,
    fetchPostsFromFollowedUsers,
    fetchPostsFromUser,
    fetchPost,
    fetchPostAuthor,
    fetchReplies,
    fetchReplyCount,
    startPostEdition,
    cancelPostEdition,
    finishPostEdition,
    startPostReply,
    createPost,
    createReply,
    cancelPostReply,
    deletePost
  }
})
