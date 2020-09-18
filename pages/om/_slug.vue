<template>
  <main class="site-main--with-aside">
    <div class="page-content">
      <PageHeader :heading="entry.title" :lead="entry.lead" />
      <div v-html="entry.body"></div>
    </div>
    <SideNav :menuItems="pages" parent="/om" parentTitle="Om stiftelsen" class="page-nav" />
  </main>
</template>

<script>
export default {
  computed: {
    entry() {
      return this.$store.state.entries.find(entry => entry.slug === this.$route.params.slug);
    },
    pages() {
      return this.$store.state.entries.filter(entry => entry.__typename === "aboutPages_page_Entry");
    }
  }
}
</script>
