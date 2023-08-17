<template>
  <Transition name="drop" appear>
  <div class="DropdownMenu">
    <h2 v-if="title">{{ title }}</h2>
    <slot><!-- optional fallback --></slot>
  </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String
  }
})
</script>

<style scoped>
.DropdownMenu {
  position: absolute;
  border: 1px solid var(--colorText);
  border-radius: var(--corner);
  background-color: var(--colorBackground);
  transform-origin: 50% 0%;
  padding: var(--spaceS);
  min-width: 12rem;
  z-index: 11;
}
</style>
