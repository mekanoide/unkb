<script setup>
const emit = defineEmits(['close'])
</script>

<template>
  <div class="Modal">
    <Button class="button-close" variant="ghost"><Icon name="ph:x-bold" size="2rem" @click="emit('close')" /></Button>
    <div class="box">
      <slot><!-- optional fallback --></slot>
    </div>
  </div>
</template>

<style scoped>
.Modal {
  position: fixed;
  inset: 0;
  background-color: var(--colorBackground);
  z-index: 100;
  display: grid;
  align-items: center;
  padding: var(--spaceM);
}

.box {
  width: 100%;
  max-width: 800px;
  margin: auto;
}

.button-close {
  position: fixed;
  top: var(--spaceM);
  right: var(--spaceM);
}
</style>
