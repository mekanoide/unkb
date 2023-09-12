<script setup>
const searchQuery = ref('')
const emit = defineEmits(['submit'])

const handleSearch = () => {
  if (searchQuery.value.length > 0) {
    emit('submit', searchQuery.value)
  }
}
</script>

<template>
  <div class="SearchField">
    <form
      action="search"
      @submit.prevent="handleSearch">
      <input
        type="search"
        v-model="searchQuery"
        placeholder="Buscar usuarios"
        @input="handleSearch" />
      <Button
        type="submit"
        class="search-button"
        variant="square">
        <Icon
          name="ph:magnifying-glass-bold"
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
  position: relative;
}

.search-button {
  position: absolute;
  right: var(--spaceXS);
}

input {
  padding-right: var(--spaceL);
}
</style>
