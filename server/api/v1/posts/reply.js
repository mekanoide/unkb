import * as cheerio from 'cheerio'
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

  const getLinks = async (txt) => {
    const linkRegex = /(https?:\/\/[^ ]*)/
    const stringToCheck = txt
    const matches = stringToCheck.match(linkRegex)
    
    if (matches) {
      const url = matches[1]
      try {
        const html = await $fetch(url)
        const $ = cheerio.load(html)

        const site_name =
          $('meta[property=og:site_name]').attr('content') ||
          $('meta[name=application-name]').attr('content')
        const title =
          $('meta[property=og:title]').attr('content') || $('title').text()
        const description =
          $('description').text() ||
          $('meta[name=description]').attr('content') ||
          $('meta[property=og:description]').attr('content')
        const image = $('meta[property=og:image]').attr('content')

        const metadata = {
          url: url,
          site_name: site_name,
          title: title,
          description: description,
          image_url: image
        }
        return metadata
      } catch {
        
      }
    }
  }

  const link = await getLinks(body.content)

  const payload = {
    author_id: user.id,
    post_id: body.post_id,
    content: body.content,
    created_at: new Date(),
    link: link
  }
  console.log('payload', payload)
  const { data } = await client
    .from('replies')
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
