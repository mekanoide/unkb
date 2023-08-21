<template>
  <Button variant="square" @click="toggleColorMode">
    <Icon :name="colorMode.value === 'dark' ? 'carbon:moon' : 'carbon:sun'" size="1.5rem" />
  </Button>
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
