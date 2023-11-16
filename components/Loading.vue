<template>
  <section>
    <h2>Cargando!!!</h2>
  </section>
</template>

<style scoped>
section {
  position: fixed;
  inset: 0;
  z-index: 5000;
  display: grid;
  justify-content: center;
  align-items: start;
  pointer-events: none;
  padding: var(--spaceL) 0;
}

h2 {
  display: grid;
  place-content: center;
  background-color: var(--colorText);
  color: var(--colorBackground);
  padding: var(--spaceS) var(--spaceM);
  border-radius: 12rem;
  text-transform: uppercase;
  outline: var(--spaceXS) solid var(--colorBackground);
}



@keyframes pulse {
  from {
    border: 0 solid var(--colorText);
  }
  to {
    border: 1rem solid var(--colorText);
  }
}
</style>
