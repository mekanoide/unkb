<script setup>
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  title: {
    type: String
  },
  closeable: {
    type: Boolean
  }
})

const emit = defineEmits(['close'])

const dropdown = ref(null)

onClickOutside(dropdown, (e) => {
  e.stopPropagation()
  emit('close')
})
</script>

<template>
  <Transition
    name="drop"
    appear>
    <div
      class="DropdownMenu"
      ref="dropdown">
      <h2 v-if="title">{{ title }}</h2>
      <slot><!-- optional fallback --></slot>
    </div>
  </Transition>
</template>

<style scoped>
header {
  display: grid;
  grid-auto-flow: column;
}
.DropdownMenu {
  position: absolute;
  border: 2px solid var(--colorText);
  border-radius: var(--corner);
  background-color: var(--colorBackground);
  transform-origin: 50% 0%;
  padding: var(--spaceS);
  min-width: 12rem;
  top: var(--spaceL);
  z-index: 2000;
  box-shadow: var(--shadowLayer);
  display: grid;
  gap: var(--spaceS);
}

.drop-enter-from,
.drop-leave-to {
  scale: 1 0.25;
  translate: 0 -0.25rem;
  opacity: 0;
}

.drop-enter-active,
.drop-leave-active {
  transition: all 200ms ease;
}

@media screen and (max-width: 1024px) {
  .DropdownMenu {
    min-width: 4rem;
    position: fixed;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    top: auto !important;
    box-shadow: none;
    border: none;
    transform-origin: 50% 100%;
    border-top: 2px solid var(--colorText);
  }
  .drop-enter-from,
  .drop-leave-to {
    translate: 0 2rem;
  }
}
</style>
