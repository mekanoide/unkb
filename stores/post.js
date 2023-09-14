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
      .select('*, users(*)')
      .eq('id', id)
      .single()
    return data
  }

  /* Fetch posts from followed users */
  const fetchPostsFromConnections = async () => {}

  /* Fetch posts from user */
  const fetchPostsFromUser = async (id) => {}

  /* fetch replies */
  const fetchReplyCount = async (id) => {
    const { data } = await client.from('replies').select().eq('post_id', id)
    return data.length
  }

  const fetchReplies = async (id) => {
    const { data } = await client
      .from('replies')
      .select('*, users(*)')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    return data
  }

  const getMentionsFromPost = (txt) => {
    const mentionRegex = /@([a-z0-9_]+)/g
    const matches = txt.match(mentionRegex)
    const mentions = ref([])

    if (matches) {
      for (const match of matches) {
        const handle = match.substring(1) // Remove the @
        mentions.value.push(handle)
      }
    }
    if (mentions.value.length > 0) {
      return mentions.value
    }
  }

  /* Fetch post's author */
  const fetchPostAuthor = async (id) => {
    const { data } = await client
      .from('posts')
      .select('*, users(*)')
      .eq('id', id)
      .single()
    return data.users
  }

  /* Create new post */
  const createPost = async () => {
    const { data, error } = await useFetch('/api/v1/posts/create', {
      method: 'post',
      body: {
        content: postContent.value
      }
    })
    postContent.value = ''
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
      console.log('Error!!!', postError)
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
    postContent.value = ''
  }

  /* Finish post edition and update post */
  const finishPostEdition = async (type) => {
    const { data, error } = await useFetch('/api/v1/posts/edit', {
      method: 'post',
      body: {
        type: type,
        post_id: postBeingEdited.value,
        content: postContent.value
      }
    })
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
      console.log('Error!!!', error)
    }
  }

  const deleteReply = async (id) => {
    const shouldDelete = confirm('De verdad quieres eliminar esta publicación?')
    if (!shouldDelete) {
      return
    }
    const { error } = await client.from('replies').delete().eq('id', id)
    if (error) {
      console.log('Error!!!', error)
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
    postContent.value = ''
  }

  return {
    postContent,
    postBeingEdited,
    postBeingReplied,
    fetchPostsFromConnections,
    fetchPostsFromUser,
    fetchPost,
    fetchPostAuthor,
    fetchReplies,
    fetchReplyCount,
    getMentionsFromPost,
    startPostEdition,
    cancelPostEdition,
    finishPostEdition,
    startPostReply,
    createPost,
    createReply,
    cancelPostReply,
    deletePost,
    deleteReply
  }
})
