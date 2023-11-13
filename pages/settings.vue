<script setup>
import { useUserStore } from '@/stores/user'

const { auth } = useSupabaseClient()
const router = useRouter()
const user = useSupabaseUser()
const userStore = useUserStore()

const { updateUser, checkHandle } = userStore

const handle = ref(null)
const bio = ref(null)

const editHandle = ref(false)
/* const editEmail = ref(false) */
const loading = ref(true)

loading.value = false

const { data: userData, refresh } = await useFetch('/api/v1/user/me')
handle.value = userData.value.handle
bio.value = userData.value.bio

const validHandle = ref(true)

const startResetPassword = () => {
  const shouldReset = confirm('Seguro que quieres regenerar tu contraseña?')
  if (!shouldReset) {
    return
  }
  navigateTo('/reset-password')
}

const validateName = async () => {
  validHandle.value = false
  const { data, error } = await checkHandle(handle.value)
  console.log(data)
  if (!data) {
    validHandle.value = false
    return
  }
  validHandle.value = true
}

const handleUpdateProfile = async () => {
  const { data, error } = await updateUser({
    handle: handle.value,
    bio: bio.value
  })
  editHandle.value = false
  refresh()
}

const handleCancelProfileEdition = () => {
  editHandle.value = false
  handle.value = userData.value.handle
  bio.value = userData.value.bio
}

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

const handleDeleteAccount = async () => {
  const shouldDelete = confirm('Seguro que quieres eliminar tu cuenta?')
  if (!shouldDelete) {
    return
  }
  const { error } = await auth.delete()
  if (error) {
    console.log(error)
    return
  }
  router.push('/signin')
}
</script>

<template>
  <h1>Configuración</h1>
  <section>
    <h2>Perfil</h2>
    <form @submit.prevent="handleUpdateProfile">
      <TextField
        label="Nombre"
        :disabled="!editHandle"
        v-model="handle"
        @blur="validateName" />
      <TextField
        label="Bio"
        placeholder="Cuenta algo sobre ti"
        textarea
        :disabled="!editHandle"
        v-model="bio" />
      <footer v-if="!editHandle">
        <Button
          type="button"
          @click.stop="editHandle = true"
          >Editar perfil</Button
        >
      </footer>
      <footer v-else>
        <Button
          :disabled="!validHandle"
          type="submit"
          >Guardar</Button
        ><Button
          variant="secondary"
          @click.stop="handleCancelProfileEdition"
          >Cancelar</Button
        >
      </footer>
    </form>
  </section>
  <!-- TODO: Implement change of email functionality -->
  <!--   <section>
    <h2>Correo electrónico</h2>
    <form @submit.prevent="">
      <TextField
        label="Correo electrónico"
        type="email"
        :disabled="!editEmail"
        v-model="user.email" />
      <footer v-if="!editEmail">
        <Button
          type="button"
          @click.stop="editEmail = true"
          >Cambiar correo electrónico</Button
        >
      </footer>
      <footer v-else>
        <Button type="submit">Guardar</Button
        ><Button
          variant="secondary"
          @click.stop="editEmail = false"
          >Cancelar</Button
        >
      </footer>
    </form>
  </section> -->
  <section>
    <h2>Cambiar contraseña</h2>
    <footer>
      <Button @click="startResetPassword">Regenerar contraseña</Button>
    </footer>
  </section>
  <section>
    <h2>Modo de color</h2>
    <ToggleColorMode />
  </section>
  <section>
    <h2>Invitaciones</h2>
    <Invitations />
  </section>
  <section>
    <h2>Cuenta</h2>
    <footer>
      <Button @click="handleSignOut"> Cerrar sesión </Button>
    </footer>
    <!--     <Button @click="handleDeleteAccount">
      <Icon
        name="ph:skull-bold"
        size="1.5rem" />
      Eliminar cuenta
    </Button> -->
  </section>
</template>

<style scoped>
section {
  display: grid;
  gap: var(--spaceM);
  padding: var(--spaceM) 0;
}

section + section {
  background-image: var(--patternBorder);
  background-size: 0px 100%, 100% 2px, 0px 100%, 100% 0px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
}

footer {
  display: flex;
  gap: var(--spaceS);
}
</style>
