<script setup>
const searchQuery = ref('')
const emit = defineEmits(['submit'])

const handleInput = () => {
  if (searchQuery.value.length > 0) {
    emit('submit', searchQuery.value)
  }
}
</script>

<template>
  <div class="SearchField">
    <form
      action="search"
      @submit.prevent="emit('submit', searchQuery)">
      <input
        type="search"
        v-model="searchQuery"
        placeholder="Buscar usuarios"
        @input="handleInput" />
      <Button
        type="submit"
        class="search-button"
        variant="square">
        <Icon
          name="carbon:search"
          size="1.5rem" />
      </Button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: var(--spaceXS);
  position: relative;
}

.search-button {
  position: absolute;
  right: var(--spaceS);
}

input {
  padding-right: var(--spaceL);
}
</style>
