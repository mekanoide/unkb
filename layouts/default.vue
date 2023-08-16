<template>
  <div class="PAGE">
    <Header />
    <div class="body">
      <slot><!-- optional fallback --></slot>
    </div>
  </div>
</template>

<style scoped>
.body {
  max-width: 1200px;
  margin: auto;
  padding: var(--spaceXL) var(--spaceM);
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spaceL);
}
</style>
