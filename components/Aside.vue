<template>
  <nav>
    <Search />
    <NavigationItem label="Chorreo" icon="carbon:chat" to="/" />
    <NavigationItem label="Conexiones" icon="carbon:friendship" to="/connections" />
    <NavigationItem label="Favoritos" icon="carbon:bookmark" to="/bookmarks" />
    <NavigationItem label="Manifiesto" icon="carbon:idea" to="/manifesto" />
  </nav>
</template>

<style scoped>
nav {
  display: grid;
  align-content: start;
  grid-auto-flow: row;
  gap: var(--spaceL);
}

@media screen and (max-width: 1024px) {
  nav {
    position: fixed;
    inset: auto 0 0 0;
    background-color: var(--colorBackground);
    grid-auto-flow: column;
    z-index: 100;
    border-top: 1px dashed currentColor;
  }
}
</style>
