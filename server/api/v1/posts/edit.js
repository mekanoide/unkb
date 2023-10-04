import { getLinks } from '@/utils/getLink'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const content = String(body.content)

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

  const link = await getLinks(content)

  const { data } = await client
    .from('posts')
    .update({
      content: content,
      scope: body.scope,
      link: link,
      edited: true
    })
    .eq('id', body.id)
    .select()

  const mentions = await getMentionsFromPost(content)

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
