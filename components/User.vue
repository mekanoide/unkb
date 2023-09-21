<script setup>
import { useMainStore } from '@/stores/main'
const mainStore = useMainStore()

const { getRoleNameById } = mainStore

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  size: {
    type: String
  }
})

const role = getRoleNameById(props.data.role_id)
</script>

<template>
  <NuxtLink
    class="User"
    :class="[size]"
    :to="`/user/${data.handle}`">
    <span class="name">{{ data.handle }}</span>
    <Badge v-if="role.id !== 4" :data="role" />
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
