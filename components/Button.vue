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
  border: 4px double currentColor;
  font-weight: 600;
  border-radius: var(--cornerButton);
  transition: var(--transition);
}

button:hover {
  color: var(--colorBackground);
  background-color: var(--colorText);
}
button.primary {
  background-color: var(--colorText);
  border-color: var(--colorText);
  color: var(--colorBackground);
}

button.primary:hover {
  border: 4px double currentColor;
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
button.ghost,
button.square {
  border: none;
}

button.square {
  aspect-ratio: 1;
  height: 2.5rem;
  padding: 0;
}

button.ghost.small {
  height: 1.5rem;
}

button.ghost:not(.small, .large) {
  height: 2rem;
}

button.ghost:hover,
button.square:hover {
  background-color: var(--colorText);
  color: var(--colorBackground);
}

button:disabled {
  background: var(--gradientFaded);
  border-color: var(--colorBackground);
  pointer-events: none;
}
</style>