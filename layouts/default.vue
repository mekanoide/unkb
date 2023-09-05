<template>
  <div class="PAGE">
    <Header />
    <main>
      <div class="logo-mobile">
        <Logo />
      </div>
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
  grid-template-columns: 1fr 3fr;
  gap: var(--spaceL);
  align-items: start;
}

main {
  padding: 6.25rem 0 var(--spaceL);
  display: grid;
  gap: var(--spaceM);
}

.logo-mobile {
  display: none;
}

@media screen and (max-width: 1024px) {
  .PAGE {
    grid-template-columns: 1fr;
  }
  main {
    padding-top: 0;
  }
  .logo-mobile {
    display: grid;
    place-content: start;
  }
}
</style>
