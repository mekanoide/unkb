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

<template>
  <NuxtLink
    class="User"
    :class="[size]"
    :to="`/${data.handle}`"
    >@{{ data.handle }}</NuxtLink
  >
</template>

<style scoped>
.User {
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
}

.User.large {
  font-size: var(--fontL);
}
</style>
