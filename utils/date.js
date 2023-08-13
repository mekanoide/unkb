export const formatDate = (t) => {
  const currentDate = new Date()
  const postDate = new Date(t)

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()

  const postYear = postDate.getFullYear()
  const postMonth = postDate.getMonth()
  const postDay = postDate.getDate()

  const hours = postDate.getHours().toString().padStart(2, '0')
  const minutes = postDate.getMinutes().toString().padStart(2, '0')

  if (currentYear === postYear && currentMonth === postMonth && currentDay === postDay) {
    // Publicado hoy
    return `${hours}:${minutes}`
  } else if (currentYear === postYear && currentMonth === postMonth && currentDay - postDay === 1) {
    return `Ayer a las ${hours}:${minutes}`
  } else if (currentYear === postYear) {
    const daysDifference = currentDay - postDay
    return `Hace ${daysDifference} días`
  } else {
    return postDate.toLocaleDateString() // Publicado en años anteriores, devuelve la fecha completa
  }
}
