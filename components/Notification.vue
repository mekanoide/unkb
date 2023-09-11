<script setup>
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
const mainStore = useMainStore()

const { notifications } = storeToRefs
</script>

<template>
  <ul>
    <li v-for="notification in notifications">{{ notification.message }}</li>
  </ul>
</template>
