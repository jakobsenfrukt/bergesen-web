<template>
  <main class="site-main--with-aside">
    <div class="page-content">
      <PageHeader :heading="entry.title" :lead="entry.lead" />
      <div v-html="entry.body" class="page-body"></div>
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
    }`,
    pages: gql`{
      pages: entries(section: "aboutpages", site: "default") {
        title
        slug
        uri
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
