import * as cheerio from 'cheerio'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const html = await $fetch(body.url)
  const $ = cheerio.load(html)

  const site_name = $('meta[property=og:site_name]').attr('content')
  const title = $('meta[property=og:title]').attr('content') || $('title').text()
  const description = $('description').text() || $('meta[name=description]').attr('content')

  const data = {
    site_name: site_name,
    title: title,
    description: description
  }
  return data
})
