import { defineStore } from 'pinia'

export const useEditionStore = defineStore('edition', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const edit = ref(null)
  const editionOK = ref(false)

  /* Start post edition */
  const openEdition = (type, id, content) => {
    edit.value = {
      type: type,
      id: id,
      content: content
    }
  }
  /* Cancel post edition */
  const cancelEdition = () => {
    edit.value = null
  }

  /* Finish post edition and update post */
  const submitEdition = async (content) => {
    const id = edit.value.id
    const type = edit.value.type
    edit.value = null
    console.log('edit', id)
    if (type === 'post') {
      const { data, error } = await useFetch('/api/v1/posts/edit', {
        method: 'post',
        body: {
          id: id,
          content: content
        }
      })
    } else if (type === 'note') {
      const { data, error } = await useFetch('/api/v1/notes/edit', {
        method: 'post',
        body: {
          id: id,
          content: content
        }
      })
    }
    editionOK.value = true
  }

  return {
    edit,
    editionOK,
    openEdition,
    cancelEdition,
    submitEdition
  }
})
