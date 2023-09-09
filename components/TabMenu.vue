<template>
  <nav role="tablist">
    <slot />
  </nav>
</template>

<style scoped>
[role=tablist] {
  display: grid;
  grid-auto-flow: column;
  border-bottom: 2px solid var(--colorText);
}
</style>