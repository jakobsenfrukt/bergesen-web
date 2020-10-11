<template>
  <main class="site-main site-main--with-aside">
    <BackgroundShape page="about" />
    <div class="page-content">
      <PageHeaderSimple :heading="entry.title" :lead="entry.lead" />
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
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`{
        entry(type: "about", site: "default") {
          ... on about_about_Entry {
            title
            lead
            body
            uri
          }
        }
        pages: entries(section: "aboutpages", site: "default") {
          title
          slug
          uri
        }
      }`
    })
    return data
  },
  fetchOnServer: true,
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
