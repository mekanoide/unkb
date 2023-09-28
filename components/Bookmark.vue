<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const handleRemove = () => {
  emit('removed')
}

const emit = defineEmits(['removed'])
</script>

<template>
  <div class="Bookmark">
    <User :data="data.users" />
    <PostContent :content="data.content" />
    <footer>
      <div class="Bookmark__actions">
        <Button
          variant="ghost"
          title="Eliminar de favoritos"
          @click="handleRemove">
          <Icon name="ph:star-bold" />
        </Button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.Bookmark {
}
</style>
