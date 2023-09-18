<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <span
    v-if="data.id !== 4"
    class="Badge">
    {{ data.name }}
  </span>
</template>

<style scoped>
.Badge {
  padding: var(--spaceXXS) var(--spaceXS) var(--spaceXXS) var(--spaceXS);
  background-color: var(--colorText);
  color: var(--colorBackground);
  font-weight: bold;
  display: flex;
  gap: var(--spaceXS);
  align-items: center;
  font-size: var(--fontS);
  border-radius: var(--corner);
  transition: var(--transition);
  text-transform: uppercase;
  position: relative;
}

span {
  display: none;
  transition: var(--transition);
}
</style>
