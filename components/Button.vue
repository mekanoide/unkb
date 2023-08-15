<template>
  <button :type="attrs.type || 'button'" :class="[ size, variant ]">
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
  border: 4px double var(--colorText);
  font-weight: 600;
  border-radius: var(--cornerButton);
  transition: var(--transition);
}
button.primary {
  background-color: var(--colorText);
  border: none;
  color: var(--colorBackground);
}

button.critical {
  color: var(--colorNegative);
}

button:not(.small, .large) {
  height: 3rem;
  padding: 0 var(--spaceM);
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
}

button.ghost.small {
  height: 1.5rem;
}

button.ghost:not(.small, .large) {
  height: 2rem;
}

button.ghost:hover {
  background-color: var(--colorText);
  color: var(--colorBackground);
}

</style>