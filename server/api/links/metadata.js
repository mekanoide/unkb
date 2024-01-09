import * as cheerio from 'cheerio'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const html = await $fetch(body.url)

  return data
})
