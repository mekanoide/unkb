<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { usePostsStore } from '@/stores/posts'
const store = useMainStore()
const postsStore = usePostsStore()

const { fetchOwnUser } = store

const { showMenu } = storeToRefs(store)
const { showCreatePost } = storeToRefs(postsStore)

const openCreatePost = () => {
  showCreatePost.value = true
}

const { data: me, error } = await useAsyncData(() => fetchOwnUser())
</script>

<template>
  <header>
    <Logo class="logo" />
    <nav class="nav-desktop">
      <NavigationButton @click="openCreatePost"> Escribir </NavigationButton>
      <NavigationItem
        label="Comunidad"
        icon="ph:globe-hemisphere-east-bold"
        to="/" />
      <!--       <NavigationItem
        label="Corrillos"
        icon="ph:users-three-bold"
        to="/groups" /> -->
      <NavigationItem
        label="Ideas"
        icon="ph:lightbulb-bold"
        to="/ideas" />
      <NavigationItem
        label="Actividad"
        icon="ph:activity-bold"
        to="/activity" />
      <NavigationItem
        label="Conexiones"
        icon="ph:users-bold"
        to="/connections" />
      <!--       <NavigationItem
        class="manifesto-button"
        label="Manifiesto"
        icon="ph:lightbulb-bold"
        to="/manifesto" />
 -->
      <NavigationItem
        label="Configuración"
        icon="ph:gear-fine-bold"
        to="/settings" />
    </nav>
    <nav class="nav-mobile">
      <NavigationItemMobile
        label="Comunidad"
        icon="ph:house-bold"
        variant="mobile"
        to="/" />
      <!--       <NavigationItem
        label="Corrillos"
        icon="ph:users-three-bold"
        to="/groups" /> -->
      <NavigationItemMobile
        label="Ideas"
        icon="ph:lightbulb-bold"
        to="/ideas" />
      <NavigationItemMobile
        label="Actividad"
        icon="ph:activity-bold"
        to="/activity" />
      <NavigationItemMobile
        label="Conexiones"
        icon="ph:users-bold"
        to="/connections" />
    </nav>
    <Transition name="slide">
      <nav
        v-if="showMenu"
        class="menu-mobile">
        <div class="menu-actions">
          <Button
            variant="ghost"
            @click="showMenu = false">
            <Icon
              name="ph:x-bold"
              size="1.5rem" />
          </Button>
        </div>
        <NavigationItem
          label="Configuración"
          icon="ph:gear-fine-bold"
          to="/settings"
          @click="showMenu = false" />
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  z-index: 1;
  top: var(--spaceL);
  bottom: var(--spaceL);
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: var(--spaceL);
}

.logo {
  margin-left: var(--spaceM);
}
.nav-desktop {
  display: grid;
  align-content: start;
  gap: var(--spaceXS);
}

.nav-mobile {
  display: grid;
  gap: var(--spaceS);
  grid-auto-flow: column;
}

.user-menu {
  bottom: 0;
}

.menu-desktop {
  position: relative;
}

.button-menu {
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  gap: var(--spaceS);
  align-items: center;
  justify-content: start;
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
  background-color: var(--colorAccent);
  color: var(--colorDark);
}

.menu-mobile {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  display: grid;
  gap: var(--spaceS);
  align-content: start;
  width: min(90%, 24rem);
  padding: var(--spaceM);
  background-color: var(--colorBackground);
  border-left: 2px solid currentColor;
  z-index: 1000;
}

.menu-actions {
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 1024px) {
  header {
    position: fixed;
    inset: auto 0 0 0;
    background-color: var(--colorText);
    color: var(--colorBackground);
    border-top: 2px solid currentColor;
    grid-auto-flow: column;
    justify-content: center;
    z-index: 100;
    padding: var(--spaceS);
    gap: 0;
  }
  .nav-desktop {
    display: none;
  }
  .logo,
  .actions {
    display: none;
  }
  .button-menu span {
    display: none;
  }
  .menu-desktop {
    display: none;
  }
}

@media screen and (min-width: 1025px) {
  .nav-mobile {
    display: none;
  }
  .menu-mobile {
    display: none;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: var(--transition);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
