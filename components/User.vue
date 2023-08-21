<template>
  <NuxtLink class="User" :to="`/${user.handle}`">@{{ user.handle }}</NuxtLink>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.User {
  font-weight: bold;
}
</style>