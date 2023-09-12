<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <p>{{ data.site_name }}</p>
  <h2>{{ data.title }}</h2>
  <p>{{ data.description }}</p>
</template>
