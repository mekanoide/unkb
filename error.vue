<script setup>
const error = useError()
</script>

<template>
  <div class="PAGE">
    <div class="Error">
      <h1>ERROR {{ error.statusCode }}</h1>
      <p>{{ error.message }}</p>
      <NuxtLink to="/">Vuelve a la página principal</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.PAGE {
  position: fixed;
  inset: 0;
  display: grid;
  place-content: center;
  padding: var(--spaceM);
}

.Error {
  display: grid;
  gap: var(--spaceM);
}

a {
  font-weight: bold;
  text-decoration: underline;
}
</style>