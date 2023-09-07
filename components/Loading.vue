<template>
  <div></div>
</template>

<style scoped>
div {
  position: fixed;
  inset: -1rem;
  z-index: 5000;
  display: grid;
  place-content: center;
  animation: pulse 1s alternate infinite;
  border-radius: 3rem;
  pointer-events: none;
}

@keyframes pulse {
  from {
    box-shadow: inset 0 0 0 0 var(--colorText);
  }
  to {
    box-shadow: inset 0 0 0 2rem var(--colorText);
  }
}
</style>
