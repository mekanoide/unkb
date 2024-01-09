<script setup>
import { storeToRefs } from 'pinia'
import { useEditionStore } from '@/stores/edition'
import { handleInfiniteScroll } from '@/utils/handleInfiniteScroll'

const editionStore = useEditionStore()

const { editionOK } = storeToRefs(editionStore)

const props = defineProps({
  fetchData: {
    type: Function,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const posts = ref([])
const loading = ref(true)
const offset = ref(0)
const hasMoreData = ref(true)

const loadMoreData = async () => {
  loading.value = true
  const newPosts = await props.fetchData(offset.value)
  if (newPosts && newPosts.length === 0) {
    hasMoreData.value = false
  } else {
    posts.value = [...posts.value, ...newPosts]
    offset.value += 1
  }
  loading.value = false
}

onMounted(() => {
  loadMoreData(offset.value)
})

watch(editionOK, async (newValue) => {
  if (newValue) {
    offset.value = 0
    loadMoreData(offset.value)
    editionOK.value = false
  }
})
</script>

<template>
  <section>
    <div v-if="posts && posts.length > 0">
      <ul>
        <li
          v-for="post in posts"
          :key="post.id">
          <Post
            v-if="type === 'post'"
            :data="post"
            @changed="fetchPosts(offset)"
            @deleted="fetchPosts(offset)" />
          <Note
            v-else-if="type === 'note'"
            :data="post"
            @changed="fetchPosts(offset)"
            @deleted="fetchPosts(offset)" />
        </li>
      </ul>
      <footer v-if="hasMoreData"><Button @click="loadMoreData">Cargar más</Button></footer>
    </div>
    <EmptyState
      v-else-if="!loading && posts && posts.length === 0"
      message="Aún no hay nada publicado" />
    <LoadingContent v-if="loading" />
    <End v-if="!hasMoreData" />
  </section>
</template>

<style scoped>
footer {
  margin-top: var(--spaceM);
  display: flex;
  justify-content: center;
}
</style>
