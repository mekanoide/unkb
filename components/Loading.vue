<template>
  <div></div>
</template>

<style scoped>
div {
  position: fixed;
  inset: 0;
  z-index: 5000;
  display: grid;
  place-content: center;
  background-color: var(--colorBackground);
  pointer-events: none;
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
