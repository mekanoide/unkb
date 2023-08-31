<script setup>
const props = defineProps({
  selected: {
    type: Boolean
  },
  value: {
    type: String
  }
})

const emit = defineEmits(['select'])
</script>

<template>
  <a
    :aria-controls="value"
    role="tab"
    :aria-selected="selected">
      <slot><!-- optional fallback --></slot>
  </a>
</template>

<style scoped>
a {
  color: var(--colorSecondary);
  text-decoration: none;
  display: grid;
  place-content: center;
  padding: 0 var(--spaceL);
  height: 3rem;
  border-bottom: 6px solid transparent;
  transition: all 200ms ease;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
}

a:hover {
  color: var(--colorPrimary);
}

a[aria-selected=true] {
  border-bottom: 6px solid var(--colorText);
}
</style>