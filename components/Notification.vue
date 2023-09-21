<script setup>
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()

const { notifications } = storeToRefs
</script>

<template>
  <ul>
    <li v-for="notification in notifications">{{ notification.message }}</li>
  </ul>
</template>
