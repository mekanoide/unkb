<template>
  <Transition name="slide">
    <section>
    </section>
  </Transition>
</template>

<style scoped>
section {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 5000;
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: start;
  pointer-events: none;
  background-color: var(--colorAccent);
  padding: var(--spaceXS);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.125s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  translate:  0 -100%;
}
</style>
