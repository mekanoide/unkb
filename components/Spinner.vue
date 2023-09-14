<template>
  <span><Icon name="ph:spinner-bold"/></span>
</template>

<style scoped>
span {
  animation: spin 1s infinite;
}

@keyframes spin {
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
}
</style>