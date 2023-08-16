<template>
  <div class="Dropdown"><slot><!-- optional fallback --></slot></div>
</template>

<style scoped>
.Dropdown {
  position: absolute;
  border: 1px solid var(--colorText);
  background-color: var(--colorBackground);
  display: grid;
  gap: var(--spaceXS);
  padding: var(--spaceS);
  z-index: 11;
}
</style>