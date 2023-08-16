<template>
  <header>
    <NuxtLink to="/">
      <Logo />
    </NuxtLink>
    <nav>
      <NuxtLink to="/">Chorreo</NuxtLink>
      <NuxtLink to="/connections">Conexiones</NuxtLink>
    </nav>
    <div class="actions">
      <ToggleColorMode />
      <Button size="small" @click="handleSignOut">Cerrar sesión</Button>
    </div>
  </header>
</template>

<script setup>
const router = useRouter()
const { auth } = useSupabaseAuthClient()

const handleSignOut = async () => {
  const { error } = await auth.signOut()
  if (error) {
    console.log(error)
    return
  }
  router.push('/access')
}
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  background-color: var(--colorBackground);
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
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

nav {
  display: grid;
  grid-auto-flow: column;
  gap: var(--spaceL);
  justify-content: center;
}

.router-link-active {
  font-weight: bold;
}
</style>
