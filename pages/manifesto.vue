<script setup>
definePageMeta({
  middleware: ['auth']
})

const config = useRuntimeConfig()
</script>

<template>
  <h1>Manifiesto</h1>
  <p>
    No me gusta el devenir que han tomado las redes sociales e internet en
    general. De redes de intercambio y descubrimiento (si bien muy imperfectas)
    hemos pasado a plataformas que apenas pueden llamarse sociales, son puro
    consumo de contenido y publicidad. La tele, vamos. Eso sin pasar por el
    sesgo ideológico de estas plataformas.
  </p>
  <p>
    {{ config.public.appName }} es una red social minimalista centrada en las
    relaciones horizontales, compartir y guardar información y el buen rollo.
  </p>
  <p>
    {{ config.public.appName }} no tendrá publicidad, ni contenidos
    patrocinados, ni marcas, ni algoritmos que decidan qué ves, ni seguimiento o
    análisis de tus datos, localización, preferencias y actividad.
  </p>
  <p>
    La plataforma pretende servir a las relaciones horizontales simétricas, y
    aunque existirá la posibilidad de seguir a gente, la persona seguidora no
    podrá interactuar de ninguna manera con el individuo seguido. Tampoco estos
    tendrán manera de contar seguidores, likes (porque no existen), etc. Vamos,
    que muerte al influencer.
  </p>
  <p>
    En parte por esto, en parte por puro espíritu punki, me estoy planteando que
    no se pueda subir ningún contenido que no sea texto.
  </p>
  <h2>El buen rollo</h2>
  <p>
    Parece un poco iluso prometer el buen rollo en una cosa que se parece un
    poco al difunto (o metamorfoseado) Twitter, que era un espanto, ¿verdad?
    Pues el caso es que me parece algo alcanzable.
  </p>
  <p>
    En primer lugar, querría dejar esto accesible solo por invitación, lo que
    hará el acceso bastante más controlado. Y esto conllevará también algo
    precioso y terrible: La responsabilidad subirá hacia arriba, es decir, que
    si un acólito es expulsado por su mal comportamiento, quien lo invitó
    recibirá una amonestación. Una persona podría llegar a ser expulsada de la
    plataforma exclusivamente por los actos de sus invitados, lo que puede parecer un poco
    nazi, pero creo que podría cortar de raíz el tema bots y trolls con cuentas en
    serie, y hará que la peñita se piense bien a quién invita y cómo se comporta.
  </p>
</template>
