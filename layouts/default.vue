<template>
  <div class="grid">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<style lang="scss">
@import '@/assets/css/variables.scss';
.grid {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
header, main, footer {
  padding: 2rem;
}
@media (max-width: $media-s) {
  header, main, footer {
    padding: 1rem;
  }
}
</style>
