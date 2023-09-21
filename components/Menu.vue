<template>
  <ul role="menu">
    <slot><!-- optional fallback --></slot>
  </ul>
</template>

<style scoped>
ul {
  display: grid;
  gap: var(--spaceXS);
}
</style>
