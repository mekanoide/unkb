import { usePostsStore } from '@/stores/posts'

export const useEditionStore = defineStore('edition', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const postsStore = usePostsStore()

  const edit = ref(null)
  const editionOK = ref(false)

  /* Start post edition */
  const openEdition = (id, content, type, scope) => {
    edit.value = {
      id: id,
      content: content,
      type: type,
      scope: scope
    }
  }
  /* Cancel post edition */
  const cancelEdition = () => {
    edit.value = null
  }

  /* Finish post edition and update post */
  const submitEdition = async (content, type, scope) => {
    const id = edit.value.id
    edit.value = null

    if (type === 'post') {
      const { data, error } = await useFetch('/api/posts/edit', {
        method: 'put',
        body: {
          id: id,
          scope: scope,
          content: content
        }
      })
      scope === 'private' ? postsStore.fetchNewIdeas() : postsStore.fetchNewPostsFromConnections()
      editionOK.value = true
    } else if (type === 'reply') {
      const { data, error } = await useFetch('/api/replies/edit', {
        method: 'put',
        body: {
          id: id,
          content: content
        }
      })
      editionOK.value = true
    }
  }

  return {
    edit,
    editionOK,
    openEdition,
    cancelEdition,
    submitEdition
  }
})
