<script setup>
import { useMainStore } from '@/stores/main'
const store = useMainStore()

const { fetchOwnUser } = store

const { data: me, error } = await useAsyncData(() => fetchOwnUser())
</script>

<template>
  <header>
    <Logo class="logo" />
    <nav class="nav-desktop">
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
        icon="ph:brain-bold"
        to="/notes" />
      <NavigationItem
        label="Actividad"
        icon="ph:activity-bold"
        to="/activity" />
      <NavigationItem
        v-if="me"
        label="Perfil"
        icon="ph:person-simple-bold"
        :to="`/user/${me.handle}`" />
      <NavigationItem
        class="manifesto-button"
        label="Manifiesto"
        icon="ph:lightbulb-bold"
        to="/manifesto" />
      <NavigationItem
        label="Configuración"
        icon="ph:gear-fine-bold"
        to="/settings" />
    </nav>
    <nav class="nav-mobile">
      <NavigationItem
        label="Comunidad"
        icon="ph:globe-hemisphere-east-bold"
        variant="mobile"
        to="/" />
      <!--       <NavigationItem
        label="Corrillos"
        icon="ph:users-three-bold"
        to="/groups" /> -->
      <NavigationItem
        label="Ideas"
        icon="ph:brain-bold"
        variant="mobile"
        to="/notes" />
      <NavigationItem
        label="Actividad"
        icon="ph:activity-bold"
        variant="mobile"
        to="/activity" />
      <NavigationItem
        v-if="me"
        label="Perfil"
        icon="ph:person-simple-bold"
        variant="mobile"
        :to="`/user/${me.handle}`" />
    </nav>
    <div class="menu-desktop"></div>
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
  grid-auto-flow: row;
  gap: var(--spaceXS);
}

.nav-mobile {
  display: grid;
  gap: var(--spaceM);
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

@media screen and (max-width: 1024px) {
  header {
    position: fixed;
    inset: auto 0 0 0;
    background-color: var(--colorBackground);
    grid-auto-flow: column;
    justify-content: center;
    z-index: 100;
    border-top: 2px solid currentColor;
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
</style>
