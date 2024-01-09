<script setup>
import { storeToRefs } from 'pinia'
import { useEditionStore } from '@/stores/edition'

const editionStore = useEditionStore()

const props = defineProps({
  type: {
    type: String,
    default: 'post'
  }
})

const { submitEdition, cancelEdition } = editionStore
const { edit } = storeToRefs(editionStore)

const content = ref(edit.value?.content ?? null)
const scope = ref(edit.value?.scope)
const pending = ref(false)

const handlePost = () => {
  submitEdition(content.value, props.type, scope.value)
}
</script>

<template>
  <Modal class="EditPost">
    <form @submit.prevent="handlePost">
      <header>
        Visibilidad:
        <ScopeSelector v-model="scope" />
      </header>
      <textarea
        cols="50"
        rows="16"
        v-model="content"></textarea>
      <Footer>
        <Actions>
          <Button
            variant="primary"
            @click="handlePost">
            Terminar
          </Button>
          <Button
            variant="secondary"
            @click="cancelEdition">
            Cancelar
          </Button>
        </Actions>
        <WordCount :count="content.length" />
      </Footer>
    </form>
  </Modal>
</template>

<style scoped>
.EditPost {
  display: grid;
  align-items: center;
  padding: var(--spaceM);
}

header {
  display: flex;
  gap: var(--spaceS);
  align-items: center;
}
form {
  height: 80svh;
  display: grid;
  gap: var(--spaceM);
  grid-template-rows: auto 1fr auto;
}
</style>
