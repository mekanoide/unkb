<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'blur'])
</script>

<template>
  <label>
    <input
      type="checkbox"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)" />
    {{ label }}
  </label>
</template>
