<template>
  <Button variant="ghost" @click="toggleColorMode"><Icon>🌣</Icon></Button>
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
