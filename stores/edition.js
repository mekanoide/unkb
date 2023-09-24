export const useEditionStore = defineStore('edition', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

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
    console.log('Edit', edit.value)
  }
  /* Cancel post edition */
  const cancelEdition = () => {
    edit.value = null
  }

  /* Finish post edition and update post */
  const submitEdition = async (content, scope) => {
    const id = edit.value.id
    const type = edit.value.type
    edit.value = null

    console.log('submit edition', id, content, scope, type)

    if (type === 'post' || type === 'note') {
      console.log('submit edition to API', id, content, scope)
      const { data, error } = await useFetch('/api/v1/posts/edit', {
        method: 'post',
        body: {
          id: id,
          scope: scope,
          content: content
        }
      })
      editionOK.value = true
      return data
    } else if (type === 'reply') {
      const { data, error } = await useFetch('/api/v1/replies/edit', {
        method: 'post',
        body: {
          id: id,
          content: content
        }
      })
      editionOK.value = true
      return data
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
