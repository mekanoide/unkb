<template>
  <button :aria-label="label">
    <Icon
      :name="icon"
      size="1.5rem" />
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String
  }
})
</script>

<style scoped>
button {
  display: grid;
  grid-auto-flow: column;
  gap: var(--spaceS);
  align-items: center;
  justify-content: start;
  transition: var(--transition);
  padding: var(--spaceM);
  border-radius: var(--cornerButton);
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
}

button:active {
  color: var(--colorDark);
  background-color: var(--colorAccent);
}
</style>
