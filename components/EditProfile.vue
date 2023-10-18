<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const { me } = storeToRefs(userStore)

const initialHandle = me.value.handle

const errorName = ref(false)
const emit = defineEmits(['update', 'close'])

const submitChanges = async () => {
  console.log('Payload', me.value.handle, me.value.bio)
  await useFetch('/api/v1/user/update', {
    method: 'post',
    body: {
      handle: me.value.handle,
      bio: me.value.bio
    }
  })
  emit('update')
}

const validateName = async () => {
  const { data, error } = await useFetch('/api/v1/auth/check-handle', {
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

.EditProfile,
form {
  display: grid;
  gap: var(--spaceM);
}
</style>
