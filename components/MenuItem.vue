<template>
  <NuxtLink class="MenuItem" :class="{ active: active }" v-if="link" :to="link" @click="emit('click')"><slot></slot></NuxtLink>
  <button class="MenuItem" :class="{ active: active }" v-else @click="emit('click')"><slot></slot></button>
</template>

<script setup>
const props = defineProps({
  link: {
    type: [String, false]
  },
  active: {
    type: Boolean,
    default: false
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
  white-space: nowrap;
  background-color: transparent;
  color: var(--colorText);
}

.MenuItem:hover,
.MenuItem.active {
  background-color: var(--colorAccent);
  color: var(--colorDark);
}
</style>