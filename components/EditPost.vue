<script setup>
import { storeToRefs } from 'pinia'
import { useEditionStore } from '@/stores/edition'

const editionStore = useEditionStore()

const { submitEdition, cancelEdition } = editionStore
const { edit } = storeToRefs(editionStore)

const content = ref(edit.value?.content ?? null)
const scope = ref(edit.value?.scope)
const pending = ref(false)

const handlePost = async () => {
  await submitEdition(content.value, scope.value)
}
</script>

<template>
  <Modal class="EditPost">
    <form @submit.prevent="handlePost">
      <textarea
        cols="50"
        rows="16"
        v-model="content"></textarea>
      <Footer>
        <Actions>
          <ButtonPublish
            v-if="edit.type === 'post'"
            type="submit"
            :disabled="!content || pending"
            v-model="scope" />
          <Button
            v-else
            type="submit"
            :disabled="!content || pending">
            Publicar
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
</style>
