<template>
  <div class="Modal">
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
</style>
