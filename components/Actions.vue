<template>
  <div class="Actions">
    <slot></slot>
  </div>
</template>

<style scoped>
.Actions {
  display: flex;
  align-items: center;
  gap: var(--spaceS);
}
</style>