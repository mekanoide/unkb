<template>
  <NuxtLink class="User" :class="[size]" :to="`/${data.handle}`">@{{ data.handle }}</NuxtLink>
</template>

<script setup>
const props = defineProps({
  data: {
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
  font-size: var(--fontL);
}
</style>