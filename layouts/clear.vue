<template>
  <div class="PAGE">
    <main>
      <slot><!-- optional fallback --></slot>
    </main>
  </div>
</template>

<style scoped>
.PAGE {
  padding: 16vh var(--spaceM) var(--spaceM) var(--spaceM);
}

main {
  display: grid;
  gap: var(--spaceL);
  max-width: min(100%, 32rem);
  margin: auto;
}
</style>
