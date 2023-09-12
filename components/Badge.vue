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
  position: relative;
}

span {
  display: none;
  transition: var(--transition);
}

.Badge:hover span {
  display: block;
  position: absolute;
  left: 3rem;
  translate: -1rem;
  background-color: var(--colorText);
  border: 2px solid var(--colorBackground);
  color: var(--colorBackground);
  padding: var(--spaceXS) var(--spaceS);
  border-radius: var(--corner);
  text-transform: uppercase;
}
</style>