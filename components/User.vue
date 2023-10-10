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
    :to="`/user/${data.handle}`">
    <span class="name">{{ data.handle }}</span>
    <Badge v-if="data.role_id !== 4" :data="data.roles" />
  </NuxtLink>
</template>

<style scoped>
.User {
  display: flex;
  gap: var(--spaceXS);
  align-items: center;
}

.name {
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
}

.User.large {
  font-size: var(--fontL);
}

.User:hover {
  text-decoration: underline;
  text-decoration-color: var(--colorAccent);
}
</style>
