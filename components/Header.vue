<template>
  <header>
    <NuxtLink to="/">
      <Logo />
    </NuxtLink>
    <div class="actions">
      <ToggleColorMode />
      <Button variant="square" @click="store.togglePopover('userMenu')"><Icon name="carbon:user-avatar" size="1.5rem" /></Button>
      <Dropdown class="user-menu" v-if="showPopover === 'userMenu'">
        <Menu>
          <MenuItem :link="`/${me.handle}`" @click="showPopover = ''">Ver perfil</MenuItem>
          <MenuItem @click="handleSignOut">Cerrar sesión</MenuItem>
        </Menu>
      </Dropdown>
    </div>
  </header>
</template>

<script setup>
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
const router = useRouter()
const { auth } = useSupabaseAuthClient()

const store = useMainStore()
const { me, showPopover } = storeToRefs(store)

const handleSignOut = async () => {
  const { error } = await auth.signOut()
  if (error) {
    console.log(error)
    return
  }
  showPopover.value = ''
  router.push('/access')
}
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  background-color: var(--colorBackground);
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  padding: var(--spaceS) var(--spaceM);
  border-bottom: 1px dotted var(--colorText);
  z-index: 10;
}

.actions {
  display: grid;
  grid-auto-flow: column;
  gap: var(--spaceM);
  align-items: center;
  justify-content: end;
}

.router-link-active {
  font-weight: bold;
}

.user-menu {
  top: 4rem;
  right: var(--spaceM);
}
</style>
