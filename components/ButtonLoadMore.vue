<template>
  <footer>
    <Button @click="$emit('click')">Cargar más</Button>
  </footer>
</template>

<style scoped>
footer {
  margin-top: var(--spaceM);
  display: flex;
  justify-content: center;
}
</style>