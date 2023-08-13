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
}
</style>
