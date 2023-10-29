<script setup>
const showCreateGroup = ref(false)

const { data: groups, refresh: refreshGroups } = await useFetch(
  '/api/v1/groups'
)
</script>

<template>
  <header>
    <h1>Corrillos</h1>
    <Button @click="showCreateGroup = true">Crear corrillo</Button>
  </header>
  <Search type="groups" />
  <ul v-if="groups && groups.length > 0">
    <li
      v-for="group in groups"
      :key="group.id">
      <h2>{{ group.name }}</h2>
    </li>
  </ul>
  <EmptyState
    v-else
    message="No has entrado en ningún corrillo" />
  <CreateGroup v-if="showCreateGroup" @close="showCreateGroup = false" />
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spaceL);
}
</style>
