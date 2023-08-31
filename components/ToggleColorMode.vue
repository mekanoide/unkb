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

<template>
  <NavigationButton @click="toggleColorMode">
    <Icon :name="colorMode.value === 'dark' ? 'ph:moon-bold' : 'ph:sun-bold'" size="1.5rem" />
    {{ colorMode.value === 'dark' ? 'Modo oscuro' : 'Modo claro' }}
  </NavigationButton>
</template>