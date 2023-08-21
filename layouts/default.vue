<template>
  <div class="PAGE">
    <Header />
    <main>
      <slot><!-- optional fallback --></slot>
    </main>
  </div>
</template>

<style scoped>
.PAGE {
  max-width: var(--maxWidthBody);
  margin: auto;
  padding: var(--spaceM);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spaceL);
  align-items: start;
}

main {
  padding-top: 7rem;
}

@media screen and (max-width: 1024px) {
  .body {
    grid-template-columns: 1fr;
  }
}
</style>
