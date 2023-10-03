<template>
  <article>
    <h1>Pequeña guía de Markdown</h1>
    <p>
      Markdown es un sencillo lenguaje de formateo de texto que puedes utilizar
      en cualquier editor de texto plano. Los posts y notas de <strong>UNKB</strong> lo soportan.
    </p>
    <h2>Básicos</h2>
    <p>
      Puedes envolver cualquier palabra o frase en **dos asteriscos** para que
      se genere texto <strong>en negrita</strong>.
    </p>
    <p>
      Puedes envolver cualquier palabra o frase en *un asterisco* para producir texto <em>en cursiva</em>.
    </p>
    <p>
      Puedes generar listas no numeradas con un guión (-) o un asterisco (*) seguidos de un espacio. Esto:
    </p>
    <p>
      - Elemento 1<br />
      - Elemento 2
    </p>
    <p>Se convierte en esto:</p>
    <ul>
      <li>Elemento 1</li>
      <li>Elemento 2</li>
    </ul>
    <p>Si quieres listas numeradas, basta empezar la línea con un número seguido de un punto.</p>
    <p>Para <mark>destacar texto</mark> puedes envolverlo ==así==, y ~~así~~ si quieres <s>tacharlo</s>.</p>
    <hr />
    <h2>Títulos</h2>
    <p>
      Puedes generar títulos de hasta 6 niveles. Para ello, basta con que
      empieces la línea con el número de almohadillas (#) correspondiente al
      nivel de título que quieras generar.
    </p>
    <p>
      # Título de nivel 1<br />
      ## Título de nivel 2<br />
      ### Título de nivel 3<br />
      #### Título de nivel 4<br />
      ##### Título de nivel 5<br />
      ###### Título de nivel 6
    </p>
    <p>Se convierte en esto:</p>
    <h1>Título de nivel 1</h1>
    <h2>Título de nivel 2</h2>
    <h3>Título de nivel 3</h3>
    <h4>Título de nivel 4</h4>
    <h5>Título de nivel 5</h5>
    <h6>Título de nivel 6</h6>
    <hr>
    <h2>Enlaces</h2>
  </article>
</template>

<style scoped>
article {
  display: grid;
  gap: var(--spaceM);
  font-variant-ligatures: none;
}
</style>
