<template>
  <NuxtLink to="/" aria-label="Inicio">
    <span class="u">U</span><span class="n">N</span><span class="k">K</span><span class="b">B</span>
  </NuxtLink>
</template>

<script setup>
const config = useRuntimeConfig()
</script>

<style scoped>
a {
  font-family: var(--fontHeadline);
  text-transform: uppercase;
  font-weight: bold;
  font-size: 3rem;
  line-height: 1;
  display: flex;
  align-items: center;
}

span {
  display: inline-block;
}

.u {
  font-size: 0.75em;
  letter-spacing: -0.075em;
}

.n { 
  letter-spacing: -0.12em;
}
.k {
  font-size: 1.5em;
  rotate: -10deg;
  letter-spacing: -0.12em;
}
</style>
