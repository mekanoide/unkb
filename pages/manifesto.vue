<script setup>
definePageMeta({
  middleware: ['auth']
})

const config = useRuntimeConfig()
</script>

<template>
  <article>
    <h1>Manifiesto</h1>
    <p>Las redes sociales, e Internet en general, han tomado en los últimos años un devenir que nos horroriza. El descubrimiento, intercambio y conexión entre personas han dado paso a plataformas que apenas pueden llamarse sociales, que son puro consumo de contenido y publicidad.</p>
    <p>Las plataformas sociales han convertido al usuario en mercancía de la que extraen hábitos de consumo, perfiles demográficos, que luego venden los verdaderos destinatarios de estos servicios: las corporaciones.</p>
    <p>Los algoritmos y sistemas de exposición y validación han hecho que la parte social, el intercambio horizontal, haya casi desaparecido y que hasta los usuarios más humildes hayan entrado en una lógica mercantilista, preocupados por reach, ratios, engagement y su marca personal.</p>
    <p>En **{{ config.public.appName }}** odiamos todo esto.</p>
  </article>
</template>