<template>
  <NuxtLink to="/" aria-label="Inicio">
    <div class="background"><span class="u">U</span><span class="n">N</span><span class="k">K</span><span class="b">B</span></div>
    <div class="foreground"><span class="u">U</span><span class="n">N</span><span class="k">K</span><span class="b">B</span></div>
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

.foreground {
  z-index: 2;  
}
.foreground :is(.k, .n) {
  background-color: var(--colorText);
  color: var(--colorBackground);
}

.background {
  rotate: -6deg;
  margin-top: 0.5rem;
  z-index: 1;
}

.background :is(.u, .n) {
  background: var(--gradientFaded);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.background :is(.k, .b) {
  color: transparent;
}
</style>
