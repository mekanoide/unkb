import MarkdownIt from 'markdown-it'
import markdownItSub from 'markdown-it-sub'
import markdownItSuper from 'markdown-it-sup'
import markdownItMark from 'markdown-it-mark'
import markdownItEmoji from 'markdown-it-emoji'
import mditHljs from 'markdown-it-highlightjs'

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  highlights: true,
  typographer: true
})
md.use(markdownItSub)
md.use(markdownItSuper)
md.use(markdownItMark)
md.use(markdownItEmoji)
md.use(mditHljs, {
  inline: true,
  auto: true,
  code: true
})
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const linkRegex = /https?:/g
  const match = token.attrs[0][1].match(linkRegex)
  if (match) {
    return `<a href="${token.attrs[0][1]}" target="_blank" rel="noopener">`
  } else {
    return `<a href="${token.attrs[0][1]}">`
  }
}

export const useMarkdown = (initialValue) => {
  const markdown = ref(initialValue)
  const html = ref('')

  watch(
    markdown,
    (newMarkdown) => {
      html.value = md.render(newMarkdown)
    },
    { immediate: true }
  )

  return html.value
}
