const axios = require('axios')
const metascraper = require('metascraper')([
  require('metascraper-title')(),
  require('metascraper-description')()
  // Puedes agregar más extractores según tus necesidades, como imagen, autor, etc.
])

exports.handler = async function (event, context) {
  try {
    const { url } = JSON.parse(event.body)
    console.log('Url', url)

    // Realiza una solicitud HTTP para obtener el contenido de la página web
    const response = await axios.get(url)
    const html = response.data

    // Utiliza metascraper para extraer los metadatos de la página web
    const metadata = await metascraper({ html, url })

    // Devuelve los metadatos como respuesta
    return {
      statusCode: 200,
      body: JSON.stringify(metadata)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener los metadatos.' })
    }
  }
}
