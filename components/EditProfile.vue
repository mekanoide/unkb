<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const { me } = storeToRefs(userStore)
const { updateUser } = userStore

const initialHandle = me.value.handle

const errorName = ref(false)
const emit = defineEmits(['update', 'close'])

const submitChanges = async () => {
  const payload = {
    handle: me.value.handle,
    bio: me.value.bio
  }
  await updateUser(payload)
  emit('update')
}

const validateName = async () => {
  const { data, error } = await useFetch('/api/auth/check-handle', {
    method: 'post',
    body: {
      handle: me.value.handle
    }
  })
  if (data.value && me.value.handle !== initialHandle) {
    errorName.value = true
  } else {
    errorName.value = false
  }
}
</script>

<template>
  <Modal @close="emit('close')">
    <div class="EditProfile">
      <h1>Editar perfil</h1>
      <form @submit.prevent="submitChanges">
        <TextField
          label="Nombre de usuario"
          :maxlength="24"
          v-model="me.handle"
          @blur="validateName" />
        <small v-if="errorName">El nombre de usuario ya está en uso.</small>
        <TextField
          label="Bio"
          :maxlength="256"
          placeholder="Escribe algo sobre ti"
          v-model="me.bio" />
        <Button type="submit" :disabled="errorName">Guardar cambios</Button>
      </form>
    </div>
  </Modal>
</template>

<style scoped>

.EditProfile {
  display: grid;
  gap: var(--spaceM);
}
</style>
