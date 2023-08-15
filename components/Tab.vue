<template>
  <a
    :aria-controls="value"
    role="tab"
    :aria-selected="selected">
      <slot><!-- optional fallback --></slot>
  </a>
</template>

<script setup>
const props = defineProps({
  selected: {
    type: Boolean
  }
})

const emit = defineEmits(['select'])
</script>

<style scoped>
a {
  color: var(--colorSecondary);
  text-decoration: none;
  display: grid;
  place-content: center;
  padding: 0 var(--spaceL);
  height: 3rem;
  border-bottom: 4px solid transparent;
  transition: all 200ms ease;
  cursor: pointer;
}

a:hover {
  color: var(--colorPrimary);
}

a[aria-selected=true] {
  border-bottom: 4px solid var(--colorText);
}
</style>