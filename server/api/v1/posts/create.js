import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const getMentionsFromPost = async (txt) => {
    const mentionRegex = /@([a-z0-9_]+)/g
    const matches = txt.match(mentionRegex)
    const mentions = ref([])
  
    if (matches) {
      for (const match of matches) {
        const username = match.substring(1) // Remove the @
        const { data: userData } = await client
          .from('users')
          .select('id, handle')
          .eq('handle', username)
          .single()
  
        if (userData) {
          mentions.value.push(userData)
        }
      }
    }
    if (mentions.value.length > 0) {
      return mentions.value
    }
  }

  const getLinksFromPost = async (txt) => {
    const mentionRegex = /@([a-z0-9_]+)/g
    const matches = txt.match(mentionRegex)
  }

  const { data: postData, error } = await client
    .from('posts')
    .upsert({
      author_id: user.id,
      content: body.content,
      created_at: new Date()
    })
    .select()
  if (error) {
    console.log('Error!!!', error)
  }

  const mentions = await getMentionsFromPost(body.content)
  if (mentions) {
    for (const mention of mentions) {
      const { data: mentionData } = await client.from('mentions').upsert({
        user_id: mention.id,
        post_id: postData.id
      })
    }
  }
  return postData
})
