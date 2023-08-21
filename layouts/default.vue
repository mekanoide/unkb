<template>
  <div class="PAGE">
    <Header />
    <div class="body">
      <Aside />
      <main>
        <slot><!-- optional fallback --></slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
.body {
  max-width: 1200px;
  margin: auto;
  padding: var(--spaceXL) var(--spaceM);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spaceL);
}

@media screen and (max-width: 1024px) {
  .body {
    grid-template-columns: 1fr;
  }
}
</style>
