<template>
  <Transition name="pop" appear>
    <li>
      <header>
        <span class="author">{{ post.users.handle }}</span> <time :datetime="date">{{ date }}</time>
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
  font-weight: 600;
}
</style>