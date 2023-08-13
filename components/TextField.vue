<template>
  <div class="TextField">
    <label for="textfield">{{ label }}</label>
    <textarea
      v-if="textarea"
      name="textfield"
      :rows="$attrs.rows"
      :value="modelValue"
      :placeholder="$attrs.placeholder"
      :disabled="disabled"
      @input="emit('update:modelValue', $event.target.value)" />
    <input
      v-else
      name="textfield"
      :type="$attrs.type || 'text'"
      :value="modelValue"
      :placeholder="$attrs.placeholder"
      :autocomplete="$attrs.autocomplete"
      :disabled="disabled"
      @input="emit('update:modelValue', $event.target.value)">
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: false
  },
  modelValue: {
    type: String,
    required: true
  },
  textarea: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
label {
  display: block;
  margin-bottom: var(--spaceS);
}
</style>