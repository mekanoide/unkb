<template>
  <button type="button"><slot><!-- optional fallback --></slot></button>
</template>

<style scoped>
button {
  display: grid;
  grid-auto-flow: column;
  gap: var(--spaceS);
  align-items: center;
  justify-content: start;
  font-size: var(--fontL);
  transition: var(--transition);
  padding: var(--spaceS);
  border-radius: var(--corner);
}

button:hover {
    background-color: var(--colorText);
    color: var(--colorBackground);
  }
</style>