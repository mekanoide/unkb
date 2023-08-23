<template>
  <NuxtLink class="User" :class="[size]" :to="`/${user.handle}`">@{{ user.handle }}</NuxtLink>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  size: {
    type: String
  }
})
</script>

<style scoped>
.User {
  font-weight: bold;
}

.User.large {
  font-size: var(--fontXL);
}
</style>