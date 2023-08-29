<script setup>
const props = defineProps({
  expanded: {
    type: Boolean
  }
})
const emit = defineEmits(['click'])
</script>

<template>
  <div :class="{ expanded: expanded}">
    <button type="button" @click="emit('click')">{{ expanded ? 'Ver menos' : 'Ver más' }}</button>
  </div>
</template>

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