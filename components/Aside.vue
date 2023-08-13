<template>
  <aside>
    <slot><!-- optional fallback --></slot>
  </aside>
</template>

<style scoped>
aside {
  display: grid;
  align-content: start;
  grid-auto-flow: row;
  gap: var(--spaceL);
}
</style>
