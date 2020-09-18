<template>
  <main class="site-main--with-aside">
    <div class="page-content">
      <PageHeader :heading="entry.title" :lead="entry.lead" />
      <div v-html="entry.body"></div>
    </div>
    <SideNav :menuItems="pages" :parent="entry.uri" :parentTitle="entry.title" class="page-nav" />
  </main>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data: function() {
    return {
      entry: {}
    }
  },
  computed: {
    pages() {
      return this.$store.state.entries.filter(entry => entry.__typename === "aboutPages_page_Entry");
    }
  },
  apollo: {
    entry: gql`{
      entry(type: "about", site: "default") {
        ... on about_about_Entry {
          title
          lead
          body
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
