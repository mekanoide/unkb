<template>
  <NuxtLink :to="to">
<!--     <Icon
      v-if="variant === 'mobile'"
      :name="icon"
      size="2rem" /> -->
    <span>{{ label }}</span>
    <span class="line"></span>
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
  grid-template-columns: auto 1fr;
  gap: var(--spaceS);
  align-items: center;
  transition: var(--transition);
  padding: var(--spaceS) 0 var(--spaceS) var(--spaceM);
  border-radius: var(--cornerButton);
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
}

.line {
  scale: 0 1;
  transform-origin: 0% 50%;
  height:2px;
  opacity: 0;
  background-image: var(--patternBorder);
  background-size: 0px 100%, 100% 2px, 0px 100%, 100% 0px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
}

a:hover {
  color: var(--colorAccent);
}

a.router-link-active .line {
  opacity: 1;
  scale: 1 1;
  transition: all 250ms ease-in-out;
}
</style>
