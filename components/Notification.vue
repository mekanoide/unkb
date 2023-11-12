<script setup>
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

const { notifications } = storeToRefs(notificationStore)
</script>

<template>
  <ul>
    <li v-for="notification in notifications">{{ notification.message }}</li>
  </ul>
</template>
