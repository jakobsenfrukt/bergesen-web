<template>
  <main>
    <PageHeader :heading="entry.title" :lead="entry.lead" />
  </main>
</template>

<script>
export default {
  computed: {
    entry() {
      return this.$store.state.entries.find(entry => entry.slug === this.$route.params.slug);
    }
  }
}
</script>
