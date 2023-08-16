<template>
  <nav role="tablist">
    <slot />
  </nav>
</template>

<style scoped>
[role=tablist] {
  display: grid;
  grid-auto-flow: column;
  gap: var(--spaceM);
}
</style>