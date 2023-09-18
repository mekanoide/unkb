import * as cheerio from 'cheerio'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const getLinks = async (txt) => {
    const linkRegex = /(https?:\/\/[^ ]*)/
    const stringToCheck = txt
    const matches = stringToCheck.match(linkRegex)
    if (matches) {
      const url = matches[1]

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
    }
  }

  const link = await getLinks(body.content)

  const { data } = await client
    .from('notes')
    .update({
      content: body.content
    })
    .eq('id', body.id)

  return data
})
