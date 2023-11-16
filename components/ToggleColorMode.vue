<script setup>
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()

const { preference } = storeToRefs(themeStore)
const { setMode } = themeStore
</script>

<template>
  <div class="ToggleColorMode">
    <button
      :class="{ active: preference === 'system' }"
      @click="setMode('system')">
      Sistema
    </button>
    <button
      :class="{ active: preference === 'light' }"
      @click="setMode('light')">
      Claro
    </button>
    <button
      :class="{ active: preference === 'dark' }"
      @click="setMode('dark')">
      Oscuro
    </button>
  </div>
</template>

<style scoped>
.ToggleColorMode {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: start;
}

button {
  display: grid;
  grid-auto-flow: column;
  gap: var(--spaceS);
  align-items: center;
  justify-content: start;
  transition: var(--transition);
  padding: 0 var(--spaceM);
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
  height: 3rem;
  border-left: 2px double var(--colorText);
  border-top: 2px double var(--colorText);
  border-bottom: 2px double var(--colorText);
}

button:first-child {
  border-radius: var(--cornerButton) 0 0 var(--cornerButton);
}

button:last-child {
  border-radius: 0 var(--cornerButton) var(--cornerButton) 0;
  border-right: 2px double var(--colorText);
}

button.active {
  background: var(--colorText);
  color: var(--colorBackground);
}
</style>
