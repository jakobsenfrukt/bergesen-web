<template>
  <div class="grid">
    <Header english />
    <Nuxt />
    <Footer />
  </div>
</template>

<style lang="scss">
.grid {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
header, main, footer {
  padding: 2rem;
}
</style>
