<template>
  <NuxtLink to="/" aria-label="Inicio">
    <div><span class="u">U</span><span class="n">N</span><span class="k">K</span><span class="b">B</span></div>
    <div><span class="u">U</span><span class="n">N</span><span class="k">K</span><span class="b">B</span></div>
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
  display: grid;
}

div {
  display: flex;
  align-items: center;
  grid-column: 1;
  grid-row: 1;
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

div:nth-child(2) {
  rotate: -6deg;
  margin-top: 0.5rem;
  background: var(--gradientFaded);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
