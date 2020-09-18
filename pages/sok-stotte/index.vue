<template>
  <main class="site-main--with-aside">
    <div class="page-content">
      <PageHeader :heading="entry.title" :lead="entry.lead" />
    </div>
    <SideNav :menuItems="pages" :parent="entry.uri" :parentTitle="entry.title" class="page-nav" />
  </main>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data() {
    return {
      entry: {}
    }
  },
  computed: {
    pages() {
      return this.$store.state.entries.filter(entry => entry.__typename === "applyPages_page_Entry");
    }
  },
  apollo: {
    entry: gql`{
      entry(type: "apply", site: "default") {
        ... on apply_apply_Entry {
          title
          lead
          uri
        }
      }
    }`
  },
  head() {
    return {
      title: this.entry.title + ' | Bergesenstiftelsen',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.entry.lead
        }
      ]
    }
  }
}
</script>
