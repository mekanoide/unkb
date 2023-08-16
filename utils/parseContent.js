/* export const parseMentions = async (txt) => {
  const client = useSupabaseClient()

  const mentionRegex = /@([a-z0-9_]+)/g
  const matches = txt.match(mentionRegex)

  if (matches) {
    for (const match of matches) {
      const username = match.substring(1) // Elimina el "@" del inicio
      const { data: userData } = await client
        .from('users')
        .select()
        .textSearch('handle', `${username}`)
      const user = userData[0]
      if (user) {
        const userLink = `[@${username}](/user/${user.id})`
        txt = txt.replace(match, userLink)
      }
    }
  }
  return txt
}

export const parseLinks = (txt) => {
  const content = ref(txt)
  const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  const matches = txt.match(linkRegex)

  if (matches) {
    for (const match of matches) {
      const link = `<a href="${match}" target="_blank">${match}</a>`
      content.value = content.value.replace(match, link)
    }
  }
  return content.value
}
 */