<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useThemeStore } from '@/stores/theme'

const userStore = useUserStore()
const themeStore = useThemeStore()

const { updateUser } = userStore
const { setMode } = themeStore
const { preference } = storeToRefs(themeStore)

const setColorMode = (mode) => {
  updateUser({
    color_mode: mode
  })
  setMode(mode)
}
</script>

<template>
  <div class="ToggleColorMode">
    <button
      :class="{ active: preference === 'system' }"
      @click.stop="setColorMode('system')">
      Sistema
    </button>
    <button
      :class="{ active: preference === 'light' }"
      @click.stop="setColorMode('light')">
      Claro
    </button>
    <button
      :class="{ active: preference === 'dark' }"
      @click.stop="setColorMode('dark')">
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
