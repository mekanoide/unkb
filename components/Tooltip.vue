<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="Tooltip">
    {{ data.message }}
  </div>
</template>