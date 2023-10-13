import { useFetch } from 'nuxt/app'

export const useNoteStore = defineStore('note', () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  /* Create new note */
  const createNote = async (content) => {
    console.log('createNote', content)
    const { data, error } = await useFetch('/api/v1/notes/create', {
      method: 'post',
      body: {
        content: content
      }
    })
  }

  const deleteNote = async (id) => {
    const shouldDelete = confirm('De verdad quieres eliminar esta idea?')
    if (!shouldDelete) return

    const { error } = await useFetch('/api/v1/notes/delete', {
      method: 'delete',
      body: {
        id: id
      }
    })
  }

  return {
    createNote,
    deleteNote
  }
})
