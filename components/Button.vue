<template>
  <button :type="attrs.type || 'text'" :class="[ size, variant ]">
    <slot />
  </button>
</template>

<script setup>
import { useAttrs } from 'vue'

const props = defineProps({
  size: {
    type: String,
    required: false
  },
  variant: {
    type: String,
    required: false
  }
})

const attrs = useAttrs()
</script>

<style scoped>
button {
  display: grid;
  grid-auto-flow: column;
  place-content: center;
  gap: var(--spaceS);
  border: 4px double black;
  font-weight: 600;
  border-radius: var(--cornerButton);
}
button.primary {
  background-color: black;
  border: none;
  color: yellow;
}

button.critical {
  color: var(--colorNegative);
}

button:not(.small, .large) {
  height: 3rem;
  padding: 0 var(--spaceL);
}

button.small {
  height: 2rem;
  padding: 0 var(--spaceS);
}

button.large {
  height: 4rem;
  padding: 0 var(--spaceL);
}
button.ghost {
  border: none;
  padding: 0 var(--spaceS);
  height: 1.5rem;
  transition: var(--transition);
}

button.ghost:hover {
  background-color: black;
  color: yellow;
}

</style>