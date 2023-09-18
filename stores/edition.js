import { defineStore } from 'pinia'

export const useEditionStore = defineStore('edition', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const edit = ref(null)

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
    if (edit.value.type === 'post') {
      const { data, error } = await useFetch('/api/v1/posts/edit', {
        method: 'post',
        body: {
          id: edit.value.id,
          content: content
        }
      })
    } else if (edit.value.type === 'note') {
      const { data, error } = await useFetch('/api/v1/notes/edit', {
        method: 'post',
        body: {
          id: edit.value.id,
          content: content
        }
      })
    }

    edit.value = null
  }

  return {
    edit,
    openEdition,
    cancelEdition,
    submitEdition
  }
})
