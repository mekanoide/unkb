import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useMainStore()
  const { paramsId, paramsHandle } = storeToRefs(store)
  if (to.params.id) {
    paramsId.value = to.params.id
    console.log('Params id!!!', paramsId.value)
  }
  if (to.params.handle) {
    paramsHandle.value = to.params.handle
    console.log('Params handle!!!', paramsHandle.value)
  }
  
})
