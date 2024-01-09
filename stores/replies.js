export const useRepliesStore = defineStore('replies', () => {
  const replies = ref([])


  return {
    replies,
    repliesTree
  }
})
