<template>
  <NuxtLink class="MenuItem" v-if="link" :to="link" @click="emit('click')"><slot></slot></NuxtLink>
  <button class="MenuItem" v-else @click="emit('click')"><slot></slot></button>
</template>

<script setup>
const props = defineProps({
  link: {
    type: [String, false]
  }
})

const emit = defineEmits(['click'])
</script>

<style scoped>
.MenuItem {
  font-weight: bold;
  text-transform: uppercase;
  padding: var(--spaceS) var(--spaceM);
  border-radius: var(--corner);
  transition: var(--transition);
}
.MenuItem:hover {
  color: var(--colorBackground);
  background-color: var(--colorText);
}
</style>