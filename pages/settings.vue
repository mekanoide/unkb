<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useThemeStore } from '@/stores/theme'

const { auth } = useSupabaseClient()
const userStore = useUserStore()

const { fetchUser, updateUser, checkIfHandleExists } = userStore
const { loadingUser, handle, bio, defaultScope } = storeToRefs(userStore)

const editHandle = ref(false)
const handleEdition = ref(null)
const bioEdition = ref(null)

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
  const { data, error } = await checkIfHandleExists(handle.value)
  if (!data) {
    validHandle.value = false
    return
  }
  validHandle.value = true
}

const handleUpdateProfile = () => {
  const { data, error } = updateUser({
    handle: handleEdition.value,
    bio: bioEdition.value
  })
  editHandle.value = false
}

const handleCancelProfileEdition = () => {
  editHandle.value = false
  handleEdition.value = handle.value
  bioEdition.value = bio.value
}

const handleSignOut = async () => {
  const shouldExit = confirm('Seguro que quieres cerrar sesión?')
  if (!shouldExit) {
    return
  }
  const { error } = await auth.signOut()
  if (error) {
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
    return
  }
  router.push('/signin')
}

/* watch(
  [colorMode, defaultScope],
  ([newColorMode, newDefaultScope], [oldColorMode, oldDefaultScope]) => {
    updateUser({
      color_mode: newColorMode,
      default_scope: newDefaultScope
    })
    if (newColorMode !== oldColorMode) {
      setMode(newColorMode)
    }
  }
)
 */

onMounted(async () => {
  await fetchUser()
  handleEdition.value = toRaw(handle.value)
  bioEdition.value = toRaw(bio.value)
})
</script>

<template>
  <h1>Configuración</h1>
  <LoadingContent v-if="loadingUser" />
  <article v-else>
    <section>
      <h2>Perfil</h2>
      <form @submit.prevent="handleUpdateProfile">
        <TextField
          label="Nombre"
          :disabled="!editHandle"
          v-model="handleEdition"
          @blur="validateName" />
        <TextField
          label="Bio"
          placeholder="Cuenta algo sobre ti"
          textarea
          :disabled="!editHandle"
          v-model="bioEdition" />
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
      <h2>Visibilidad predeterminada</h2>
      <p>
        Cada nuevo post que escribas tendrá esta visibilidad por defecto, aunque
        siempre podrás cambiarla.
      </p>
      <ScopeSelector v-model="defaultScope" />
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
  </article>
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
