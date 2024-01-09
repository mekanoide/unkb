<script setup>
const name = ref('')
const description = ref('')
const open = ref(true)

const createGroup = async () => {
  const { data, error } = await useFetch('/api/groups/create', {
    method: 'post',
    body: {
      name: name.value,
      description: description.value,
      open: open.value
    }
  })
  if (error) {
  }
  emit('close')
}

const emit = defineEmits(['close'])
</script>

<template>
  <Modal>
    <form
      action=""
      @submit.prevent="createGroup">
      <TextField
        label="Nombre del corrillo *"
        placeholder="Escribe el nombre del corrillo"
        instructions="El nombre del corrillo no puede contener espacios ni caracteres especiales y tiene que ser único."
        v-model="name" />
      <TextField
        label="Descripción"
        v-model="description" />
      <ToggleSwitch
        label="¿Es un corrillo abierto?"
        v-model="open" />
      <footer>
        <Actions>
          <Button type="submit">Crear corrillo</Button>
          <Button type="button" variant="secondary" @click="emit('close')">Cancelar</Button>
        </Actions>
      </footer>
    </form>
  </Modal>
</template>
