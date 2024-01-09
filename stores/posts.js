import { useFetch } from 'nuxt/app'

export const usePostsStore = defineStore('posts', () => {
  const client = useSupabaseClient()

  const showCreatePost = ref(false)

  const postBeingEdited = ref(null)
  const postBeingReplied = ref(null)
  const postContent = ref('')

  const postsFromConnections = ref([])
  const offsetPostsFromConnections = ref(0)
  const hasMorePostsFromConnections = ref(true)
  const pendingPosts = ref(false)

  const ideas = ref([])
  const offsetIdeas = ref(0)
  const hasMoreIdeas = ref(true)

  const activePost = ref(null)
  const activeReplies = ref([])
  const replyCount = ref(0)

  const repliesTree = computed(() => {
    if (!activeReplies.value) return null
    return buildTree(activeReplies.value)
  })

  /* Fetch active post with replies */
  const fetchPostWithReplies = async (id) => {
    if (activePost.value && activePost.value.id === id) {
      return activePost.value
    }
    const { data: post } = await useFetch(`/api/posts/${id}`)
    const { data: replies } = await useFetch(`/api/replies/${id}`)
    activePost.value = post.value
    activeReplies.value = replies.value
  }

  const buildTree = (responses, parentId = null) => {
    const tree = []
    for (const response of responses) {
      if (response.parent_id === parentId) {
        const children = buildTree(responses, response.id)
        if (children.length) {
          response.children = children
        }
        tree.push(response)
      }
    }
    return tree
  }

  /* Fetch posts from connections */
  const fetchNewPostsFromConnections = async () => {
    offsetPostsFromConnections.value = 0
    pendingPosts.value = true
    const { data } = await useFetch(
      `/api/posts/followed?offset=${offsetPostsFromConnections.value}`
    )
    postsFromConnections.value = data.value
    pendingPosts.value = false
  }

  /* Fetch ideas */
  const fetchNewIdeas = async () => {
    offsetIdeas.value = 0
    pendingPosts.value = true
    const { data } = await useFetch(
      `/api/posts/ideas?offset=${offsetIdeas.value}`
    )
    ideas.value = data.value
    pendingPosts.value = false
  }

  const checkPostsFromConnections = async () => {
    if (
      !postsFromConnections.value ||
      postsFromConnections.value.length === 0
    ) {
      fetchNewPostsFromConnections()
    }
  }

  const checkIdeas = async () => {
    if (!ideas.value || ideas.value.length === 0) {
      fetchNewIdeas()
    }
  }

  const fetchMorePostsFromConnections = async () => {
    if (!hasMorePostsFromConnections.value) {
      return
    }
    offsetPostsFromConnections.value++
    pendingPosts.value = true
    const { data } = await useFetch(
      `/api/posts/followed?offset=${offsetPostsFromConnections.value}`
    )
    postsFromConnections.value = [...postsFromConnections.value, ...data.value]
    pendingPosts.value = false
  }

  /* Fetch posts from user */
  const fetchPostsFromUser = async (id) => {}

  /* fetch replies */
  const fetchReplyCount = async (id) => {
    const { data } = await useFetch(`/api/replies/count/${id}`)
    return data.value
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
  const createPost = async (content, scope) => {
    const { data, error } = await useFetch('/api/posts/create', {
      method: 'post',
      body: {
        content: content,
        scope: scope
      }
    })
  }

  /* Submit new post */
  const submitPost = async (content, scope) => {
    const { data, error } = await useFetch('/api/posts/create', {
      method: 'post',
      body: {
        content: content,
        scope: scope
      }
    })
    showCreatePost.value = false
    fetchNewPostsFromConnections()
  }

  /* Create new reply to post */
  const createReply = async (postId, content, parentId) => {
    const { data, error } = await useFetch('/api/replies/create', {
      method: 'post',
      body: {
        post_id: postId,
        content: content,
        parent_id: parentId
      }
    })
    /*     const { data: postData, error: postError } = await client
      .from('replies')
      .upsert({
        author_id: user.value.id,
        content: postContent.value,
        created_at: new Date(),
        post_id: id
      })
      .select()
      .single()
    postContent.value = ''
    return postData */
  }

  const deletePost = async (id) => {
    const shouldDelete = confirm('De verdad quieres eliminar esto?')
    if (!shouldDelete) {
      return
    }
    const { error } = await useFetch('/api/posts/delete', {
      method: 'delete',
      body: {
        id: id
      }
    })
  }

  const deleteIdea = async (id) => {
    const shouldDelete = confirm('De verdad quieres eliminar esto?')
    if (!shouldDelete) {
      return
    }
    const { error } = await useFetch('/api/posts/delete', {
      method: 'delete',
      body: {
        id: id
      }
    })
    fetchNewIdeas()
  }

  const deleteReply = async (id) => {
    const shouldDelete = confirm('De verdad quieres eliminar esta publicación?')
    if (!shouldDelete) {
      return
    }
    const { error } = await client.from('replies').delete().eq('id', id)
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
    showCreatePost,
    postContent,
    postBeingEdited,
    postBeingReplied,
    offsetPostsFromConnections,
    offsetIdeas,
    postsFromConnections,
    ideas,
    activePost,
    activeReplies,
    replyCount,
    repliesTree,
    hasMorePostsFromConnections,
    hasMoreIdeas,
    pendingPosts,
    checkPostsFromConnections,
    checkIdeas,
    fetchNewIdeas,
    fetchNewPostsFromConnections,
    fetchMorePostsFromConnections,
    fetchPostsFromUser,
    fetchPostWithReplies,
    fetchPostAuthor,
    getMentionsFromPost,
    fetchReplyCount,
    submitPost,
    createPost,
    deletePost,
    deleteIdea
  }
})
