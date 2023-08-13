<template>
  <header>
    <Logo />
    <div class="actions">
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
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  padding: var(--spaceS) var(--spaceM);
}
</style>