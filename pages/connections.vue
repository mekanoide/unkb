<script setup>
const user = useSupabaseUser()
</script>

<template>
  <h1>Conexiones</h1>
  <Connections :id="user.id" />
</template>
