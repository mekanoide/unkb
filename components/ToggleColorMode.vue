<template>
  <Button variant="ghost" @click="toggleColorMode"><span>🌣</span></Button>
</template>

<script setup>
const colorMode = useColorMode()

const toggleColorMode = () => {
  if (colorMode.value === 'dark') {
    colorMode.preference = 'light'
  } else {
    colorMode.preference = 'dark'
  }
}
</script>

<style scoped>
span {
  font-size: var(--fontL);
}
</style>