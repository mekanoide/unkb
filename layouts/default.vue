<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useMainStore } from '@/stores/main'
const userStore = useUserStore()
const mainStore = useMainStore()

const { showMenu } = storeToRefs(mainStore)
const { me } = storeToRefs(userStore)
</script>

<template>
  <div class="PAGE">
    <PageHeader />
    <main>
      <div class="header-mobile">
        <Logo />
        <Button
          variant="ghost"
          @click="showMenu = !showMenu">
          <Icon
            name="ph:list-bold"
            size="1.5rem" />
        </Button>
      </div>
      <slot><!-- optional fallback --></slot>
    </main>
  </div>
</template>

<style scoped>
.PAGE {
  max-width: var(--maxWidthBody);
  margin: auto;
  padding: var(--spaceL) var(--spaceM);
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: var(--spaceL);
  align-items: start;
}

main {
  display: grid;
  gap: var(--spaceM);
}

.header-mobile {
  display: none;
}

@media screen and (max-width: 1024px) {
  .PAGE {
    grid-template-columns: 1fr;
  }
  main {
    padding-top: 0;
    padding-bottom: var(--spaceXL);
  }
  .header-mobile {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
