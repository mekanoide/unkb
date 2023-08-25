<template>
  <div><Transition name="inyourface" appear>
    <h1>Cargando!!!</h1>
  </Transition></div>
</template>

<style scoped>
div {
  background-color: var(--colorBackground);
  position: fixed;
  inset: 0;
  z-index: 5000;
  display: grid;
  place-content: center;
}
h1 {
  font-size: 10vw;
}
</style>