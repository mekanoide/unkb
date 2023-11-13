<template>
  <NuxtLink :to="to">
    <Icon
      v-if="variant === 'mobile'"
      :name="icon"
      size="2rem" />
    <span>{{ label }}</span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  variant: {
    type: String,
    required: false
  }
})

const size = computed(() => {
  if (props.variant === 'mobile') {
    return '2rem'
  }
  return '1.5rem'
})
</script>

<style scoped>
a {
  display: grid;
  grid-auto-flow: column;
  gap: var(--spaceS);
  align-items: center;
  justify-content: start;
  transition: var(--transition);
  padding: var(--spaceS) var(--spaceM);
  border-radius: var(--cornerButton);
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
}

a:hover {
  color: var(--colorDark);
  background-color: var(--colorAccent);
}

a.router-link-active {
  background-color: var(--colorAccent);
  color: var(--colorDark);
}

@media screen and (max-width: 1024px) {
  a {
    padding: var(--spaceS) var(--spaceM);
  }
  span {
    display: none;
  }
}
</style>
