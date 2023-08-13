<template>
  <Transition name="pop" appear>
    <li>
      <header>
        <div><span class="author">{{ post.users.handle }}</span> <time :datetime="date">{{ date }}</time></div>
        <Button v-if="isOwner" variant="ghost">⋯</Button>
      </header>
      <Content :content="post.content" />
    </li>
  </Transition>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const user = useSupabaseUser()

const isOwner = computed(() => {
  return props.post.author_id === user.value.id
})

const date = computed(() => formatDate(props.post.created_at))
</script>

<style scoped>
li {
  padding: var(--spaceM) 0;
}

li + li {
  border-top: 1px dashed black;
}

.author {
  font-weight: bold;
}

header {
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
}
</style>