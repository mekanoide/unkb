<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div
    v-if="data.id !== 4"
    class="Badge">
    <Icon
      v-if="data.icon"
      :name="data.icon" size="1rem" />
    <span>{{ data.name }}</span>
  </div>
</template>

<style scoped>
.Badge {
  padding: var(--spaceXS) var(--spaceS) var(--spaceXS) var(--spaceXS);
  display: flex;
  gap: var(--spaceXS);
  align-items: center;
  font-size: var(--fontS);
  border-radius: var(--corner);
  transition: var(--transition);
}

span {
  display: none;
}

.Badge:hover {
  background-color: var(--colorText);
  color: var(--colorBackground);
}

.Badge:hover span {
  display: inline;
}
</style>