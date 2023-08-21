<template>
  <nav aria-label="main">
    <slot><!-- optional fallback --></slot>
  </nav>
</template>

<style scoped>
nav {
  display: grid;
  gap: var(--spaceS);
}
</style>
