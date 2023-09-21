import { defineStore } from 'pinia'

export const useEditionStore = defineStore('edition', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const edit = ref(null)
  const editionOK = ref(false)

  /* Start post edition */
  const openEdition = (id, content, type) => {
    edit.value = {
      id: id,
      content: content,
      type: type
    }
    console.log('Edit', edit.value)
  }
  /* Cancel post edition */
  const cancelEdition = () => {
    edit.value = null
  }

  /* Finish post edition and update post */
  const submitEdition = async (content) => {
    const id = edit.value.id
    edit.value = null
    const { data, error } = await useFetch('/api/v1/posts/edit', {
      method: 'post',
      body: {
        id: id,
        content: content
      }
    })
    editionOK.value = true
    return data
  }

  return {
    edit,
    editionOK,
    openEdition,
    cancelEdition,
    submitEdition
  }
})
