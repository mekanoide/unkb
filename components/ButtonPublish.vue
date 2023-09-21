<script setup>

import { useMainStore } from '@/stores/main'
const mainStore = useMainStore()
const props = defineProps({
  pending: {
    type: Boolean
  },
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const { showPopover } = storeToRefs(mainStore)

const handleOpenScope = () => {
  if (showPopover.value === 'scope') {
    showPopover.value = null
  } else {
    showPopover.value = 'scope'
  }
}

const selectScope = (scope) => {
  emit('update:modelValue', scope)
  showPopover.value = null
}

const scopeIcon = computed(() => {
  switch (props.modelValue) {
    case 'public':
      return 'ph:globe-hemisphere-east-bold'
    case 'connections':
      return 'ph:users-three-bold'
    case 'trust':
      return 'ph:medal-bold'
    case 'fire':
      return 'ph:fire-bold'
  }
})

watch(props.modelValue, (newValue) => {
  console.log('New value', newValue)
})
</script>

<template>
  <div class="wrapper">
    <div class="ButtonPublish">
      <button
        class="button-publish"
        type="submit"
        :disabled="$attrs.disabled">
        <Spinner v-if="pending" />
        <span v-else>Publicar</span>
      </button>
      <button
        class="button-scope"
        type="button"
        @click="handleOpenScope">
        <Icon
          :name="scopeIcon"
          size="1.5rem" />
      </button>
    </div>
    <Dropdown
      class="menu-scope"
      v-if="showPopover === 'scope'">
      <Menu>
        <MenuItem
          :active="modelValue === 'public'"
          @click="selectScope('public')">
          <Icon
            name="ph:globe-hemisphere-east-bold"
            size="1.5rem" />
          Público
        </MenuItem>
        <MenuItem
          :active="modelValue === 'connections'"
          @click="selectScope('connections')">
          <Icon
            name="ph:users-three-bold"
            size="1.5rem" />
          Conexiones
        </MenuItem>
        <MenuItem
          :active="modelValue === 'trust'"
          @click="selectScope('trust')">
          <Icon
            name="ph:medal-bold"
            size="1.5rem" />
          Gente de confianza
        </MenuItem>
        <MenuItem
          :active="modelValue === 'fire'"
          @click="selectScope('fire')">
          <Icon
            name="ph:fire-bold"
            size="1.5rem" />
          Círculo de fuego
        </MenuItem>
      </Menu>
    </Dropdown>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
}
.ButtonPublish {
  display: grid;
  grid-auto-flow: column;
  align-items: stretch;
  justify-content: start;
  height: 3rem;
}

button {
  background-color: var(--colorText);
  color: var(--colorBackground);
  border-radius: var(--cornerButton);
  transition: var(--transition);
}

button:hover {
  background-color: var(--colorAccent);
  color: var(--colorDark)
}

.menu-scope {
  position: absolute;
  top: 0;
  left: calc(100% + var(--spaceXS));
  z-index: 1;
}

.button-publish {
  padding: 0 var(--spaceM);
  border-radius: var(--cornerButton) 0 0 var(--cornerButton);
  font-weight: bold;
  text-transform: uppercase;
  transition: var(--transition);
}

.button-scope {
  padding: 0 var(--spaceS);
  border-left: 2px dashed currentColor;
}

.publish-button-wrapper {
  display: grid;
  grid-auto-flow: column;
  gap: 2px;
  align-items: center;
  justify-content: start;
}
</style>
