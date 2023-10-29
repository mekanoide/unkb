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
        :placeholder="$attrs.placeholder"
        @input="handleSearch" />
      <Button
        type="submit"
        class="search-button"
        variant="square">
        <Icon
          name="fa-solid:search"
          size="1.25rem" />
      </Button>
    </form>
  </div>
</template>

<style scoped>
form {
  position: relative;
  align-items: center;
}

.search-button {
  position: absolute;
  right: var(--spaceXS);
}

input {
  padding-right: var(--spaceL);
}
</style>
