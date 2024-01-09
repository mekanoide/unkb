export const useThemeStore = defineStore('theme', () => {
  const colorMode = useColorMode()

  const preference = ref('system')

  const setMode = (mode) => {
    colorMode.preference = mode
    if (process.client) {
      localStorage.setItem('appearance', mode)
    }
    preference.value = mode
  }

  const initialise = () => {
    if (process.client) {
      preference.value = localStorage.getItem('appearance') || 'system'
    } else {
      preference.value = 'system'
    }
    colorMode.preference = preference.value
  }
  return {
    preference,
    setMode,
    initialise
  }
})
