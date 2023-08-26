<template>
  <div :class="{ expanded: expanded}">
    <button type="button" @click="emit('click')">{{ expanded ? 'Menos' : 'Leer más' }}</button>
  </div>
</template>

<script setup>
const props = defineProps({
  expanded: {
    type: Boolean
  }
})
const emit = defineEmits(['click'])
</script>

<style scoped>
div {
  margin-top: -5rem;
  padding-top: 5rem;
  position: relative;
  z-index: 1;
}

div:not(.expanded) {
  background: linear-gradient(transparent, var(--colorBackground) 40%);
}

button {
  font-weight: bold;
  padding: var(--spaceS) 0;
}
</style>