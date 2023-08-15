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
  border-bottom: 1px solid var(--colorText);
}
</style>