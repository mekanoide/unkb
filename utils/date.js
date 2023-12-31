export const formatDate = (t) => {
  const currentDate = new Date()
  const postDate = new Date(t)

  const msDifference = currentDate - postDate
  const daysDifference = Math.ceil(msDifference / (1000 * 60 * 60 * 24))

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()

  const postYear = postDate.getFullYear()
  const postMonth = postDate.getMonth()
  const postDay = postDate.getDate()

  const hours = postDate.getHours().toString().padStart(2, '0')
  const minutes = postDate.getMinutes().toString().padStart(2, '0')

  if (
    currentYear === postYear &&
    currentMonth === postMonth &&
    currentDay === postDay
  ) {
    // Publicado hoy
    return `a las ${hours}:${minutes}`
  } else if (daysDifference === 1) {
    return `ayer a las ${hours}:${minutes}`
  } else if (currentYear === postYear) {
    return `hace ${daysDifference} días`
  } else {
    return postDate.toLocaleDateString() // Publicado en años anteriores, devuelve la fecha completa
  }
}

export const formatFormalDate = (t) => {
  const date = new Date(t)


  const postYear = date.getFullYear()
  const postMonth = (date.getMonth() + 1).toString().padStart(2, '0')
  const postDay = date.getDate().toString().padStart(2, '0')

  return `${postYear}${postMonth}${postDay}`

 // return date.toLocaleDateString() // Publicado en años anteriores, devuelve la fecha completa
}
