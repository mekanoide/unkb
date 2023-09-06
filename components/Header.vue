<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
const store = useMainStore()

const { auth } = useSupabaseClient()
const router = useRouter()

const { fetchOwnUser, togglePopover } = store
const { showPopover } = storeToRefs(store)

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
  router.push('/signin')
}

const { data: me, error } = await useAsyncData(() => fetchOwnUser())
</script>

<template>
  <header>
    <Logo class="logo" />
    <Search class="search" />
    <nav>
      <NavigationItem
        label="Chorreo"
        icon="ph:house-bold"
        to="/" />
      <NavigationItem
        class="search-button"
        label="Search"
        icon="ph:magnifying-glass-bold"
        to="/search" />
      <NavigationItem
        label="Actividad"
        icon="ph:activity-bold"
        to="/activity" />
      <NavigationItem
        label="Guardados"
        icon="ph:bookmarks-simple-bold"
        to="/bookmarks" />
      <NavigationItem
        class="manifesto-button"
        label="Manifiesto"
        icon="ph:lightbulb-bold"
        to="/manifesto" />
      <NavigationItem
        label="Perfil"
        icon="ph:user-bold"
        :to="`/${me.handle}`" />
    </nav>
    <div class="menu-wrapper">
      <button
        class="button-menu"
        @click.stop="togglePopover('main-menu')">
        <Icon
          name="ph:list-bold"
          size="1.5rem" />
        <span>Menú</span>
      </button>
      <Dropdown
        v-if="showPopover === 'main-menu'"
        class="menu">
        <NavigationItem
        label="Danos dinero!"
        icon="ph:coin-bold"
        to="/support"
        />
        <ToggleColorMode />
        <NavigationButton @click="handleSignOut">
          <Icon
            name="ph:sign-out-bold"
            size="1.5rem" />
          Cerrar sesión
        </NavigationButton>
      </Dropdown>
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  z-index: 1;
  top: var(--spaceM);
  display: grid;
  gap: var(--spaceL);
}

nav {
  display: grid;
  align-content: start;
  grid-auto-flow: row;
  gap: var(--spaceS);
}

.user-menu {
  bottom: 0;
}

.menu-wrapper {
  position: relative;
}

.button-menu {
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  gap: var(--spaceS);
  align-items: center;
  justify-content: start;
  font-size: var(--fontL);
  transition: var(--transition);
  padding: var(--spaceS);
  border-radius: var(--corner);
  text-transform: uppercase;
  font-weight: bold;
}

.menu {
  left: 0;
  top: 4rem;
  min-width: 100%;
}

.button-menu:hover {
  background-color: var(--colorText);
  color: var(--colorBackground);
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
    gap: 0;
  }
  nav {
    grid-auto-flow: column;
    margin-right: var(--spaceS);
  }
  .search-button {
    display: grid;
  }
  .manifesto-button {
    display: none;
  }
  .search,
  .logo,
  .actions {
    display: none;
  }
  .button-menu span {
    display: none;
  }
  .menu-wrapper {
    border-top: none;
  }
}
</style>
