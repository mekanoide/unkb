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
  },
  error: {
    type: String
  },
  instructions: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue', 'blur'])
</script>

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
      @input="emit('update:modelValue', $event.target.value)"
    />
    <input
      v-else
      name="textfield"
      :type="$attrs.type || 'text'"
      :value="modelValue"
      :placeholder="$attrs.placeholder"
      :autocomplete="$attrs.autocomplete"
      :disabled="disabled"
      :invalid="error !== null"
      @input="emit('update:modelValue', $event.target.value)"
      @blur="emit('blur')"
    />
    <small v-if="error">{{ error }}</small>
    <small v-if="instructions">{{ instructions }}</small>
  </div>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: var(--spaceS);
}

small {
  display: block;
  margin-top: var(--spaceS);
}
</style>
