<template>
  <Overlay @click.stop="showPopover = null" />
  <Transition
    name="drop"
    appear>
    <div class="DropdownMenu">
      <header>
        <h2 v-if="title">{{ title }}</h2>
        <Button
          class="close-button"
          v-if="closeable"
          variant="ghost"
          size="small"
          @click="showPopover = null">
          <Icon name="ph:x-bold" />
        </Button>
      </header>
      <slot><!-- optional fallback --></slot>
    </div>
  </Transition>
</template>

<script setup>
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

const store = useMainStore()

const props = defineProps({
  title: {
    type: String
  },
  closeable: {
    type: Boolean
  }
})

const { showPopover } = storeToRefs(store)
</script>

<style scoped>
header {
  display: grid;
  grid-auto-flow: column;
}
.DropdownMenu {
  position: absolute;
  border: 1px solid var(--colorText);
  border-radius: var(--corner);
  background-color: var(--colorBackground);
  transform-origin: 50% 0%;
  padding: var(--spaceS);
  min-width: 12rem;
  top: var(--spaceL);
  z-index: 2000;
  box-shadow: var(--spaceS) var(--spaceS) 0 var(--colorNeutral);
}

.close-button {
  justify-self: end;
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
    bottom: 0;
    left: 0;
    right: 0;
    top: auto !important;
    box-shadow: none;
    border: none;
    transform-origin: 50% 100%;
    border-top: 1px solid var(--colorText);
  }
  .drop-enter-from,
  .drop-leave-to {
    translate: 0 2rem;
  }
}
</style>
