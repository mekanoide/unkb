<template>
  <header>
    <Logo class="logo" />
    <nav>
      <Search class="search" />
      <NavigationItem class="search-button" label="Search" icon="carbon:search" to="/search" />
      <NavigationItem label="Chorreo" icon="carbon:chat" to="/" />
      <NavigationItem label="Conexiones" icon="carbon:friendship" to="/connections" />
      <NavigationItem label="Guardados" icon="carbon:bookmark" to="/bookmarks" />
      <NavigationItem label="Manifiesto" icon="carbon:idea" to="/manifesto" />
      <NavigationItem label="Perfil" icon="carbon:user" :to="`/${store.me.handle}`" />
    </nav>
    <div class="actions">
      <ToggleColorMode />
      <NavigationButton @click="handleSignOut">
        <Icon name="carbon:exit" size="1.5rem"/>
        Cerrar sesión
      </NavigationButton>
    </div>
  </header>
</template>

<script setup>
import { useMainStore } from '@/stores/main'
const store = useMainStore()
const { fetchOwnUser } = store

const handleSignOut = async () => {
  const shouldExit = confirm('Seguro que quieres cerrar sesión?')
  if (!shouldExit) {
    return
  }
  const { error } = await auth.signOut()
  if (error) {
    console.log(error)
    return
  }
  showPopover.value = ''
  router.push('/access')
}

const { data, error } = await useAsyncData('user', async () => {
  const data = await fetchOwnUser()
  return data
})
</script>

<style scoped>
header {
  position: sticky;
  top: var(--spaceM);
  display: grid;
  gap: var(--spaceL);
}

nav {
  display: grid;
  align-content: start;
  grid-auto-flow: row;
  gap: var(--spaceM);
}

.actions {
  display: grid;
  gap: var(--spaceS);
  border-top: 1px dashed currentColor;
  align-self: end;
  padding: var(--spaceM) 0;
}

.user-menu {
  bottom: 0;
}

.search-button {
  display: none;
}

@media screen and (max-width: 1024px) {
  header {
    position: fixed;
    inset: auto 0 0 0;
    background-color: var(--colorBackground);
    grid-auto-flow: column;
    justify-content: center;
    z-index: 100;
    border-top: 1px dashed currentColor;
    padding: var(--spaceS);
  }
  nav {
    grid-auto-flow: column;
  }
  .search,
  .logo,
  .actions {
    display: none;
  }
}
</style>
