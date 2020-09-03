<template>
  <header>
    <div class="logo">(logo)</div>
    <nav class="translate">
      <NLink :to="slug">{{ language }}</NLink>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    language: String
  },
  computed: {
    slug: function() {
      return '/' + this.language
    }
  }
}
</script>

<style lang="scss" scoped>
.translate {
  position: absolute;
  top: 2rem;
  right: 2rem;
}
</style>
