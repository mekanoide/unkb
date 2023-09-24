<template>
  <header>
    <slot></slot>
  </header>
</template>

<style scoped>
header {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}
</style>
