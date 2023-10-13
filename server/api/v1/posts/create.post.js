import { getLinks } from '@/utils/getLink'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const getMentionsFromPost = async (txt) => {
    const mentionRegex = /@([a-z0-9_]+)/g
    const matches = txt.match(mentionRegex)
    let mentions = []

    if (matches) {
      for (const match of matches) {
        const username = match.substring(1) // Remove the @
        const { data: userData } = await client
          .from('users')
          .select('id, handle')
          .eq('handle', username)
          .single()

        if (userData) {
          mentions.push(userData)
        }
      }
    }
    if (mentions.length > 0) {
      return mentions
    }
  }

  const link = await getLinks(body.content)

  const payload = {
    author_id: user.id,
    content: body.content,
    created_at: new Date(),
    link: link,
    scope: body.scope 
  }
  console.log('payload', payload)
  const { data } = await client
    .from('posts')
    .upsert(payload)
    .select()

  const mentions = await getMentionsFromPost(body.content)
  if (mentions) {
    for (const mention of mentions) {
      const { data: mentionData } = await client.from('mentions').upsert({
        user_id: mention.id,
        post_id: data.id
      })
    }
  }
  return data
})
