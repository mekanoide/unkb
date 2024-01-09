<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String
  }
})

const showScopeMenu = ref(false)

const scopeLabel = computed(() => {
  switch (props.modelValue) {
    case 'connections':
      return 'Vínculos'
    case 'private':
      return 'Para mí'
    case 'public':
      return 'Público'
  }
})

const setScope = (s) => {
  emit('update:modelValue', s)
  showScopeMenu.value = false
}
</script>

<template>
  <div class="ScopeSelector">
    <Button
      variant="secondary"
      @click="showScopeMenu = true">
      {{ scopeLabel }} <Icon name="ph:caret-up-down-bold" />
    </Button>
    <Dropdown
      class="menu-scope"
      v-if="showScopeMenu"
      @close="showScopeMenu = false">
      <Menu>
        <MenuItem
          :active="modelValue === 'private'"
          @click="setScope('private')">
          Para mí
        </MenuItem>
        <MenuItem
          :active="modelValue === 'connections'"
          @click="setScope('connections')">
          Vínculos
        </MenuItem>
        <MenuItem
          :active="modelValue === 'public'"
          @click="setScope('public')">
          Público
        </MenuItem>
        <!--         <MenuItem
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
          </MenuItem> -->
      </Menu>
    </Dropdown>
  </div>
</template>

<style scoped>
.ScopeSelector {
  position: relative;
}

.menu-scope {
  top: calc(100% + var(--spaceS));
}
</style>
