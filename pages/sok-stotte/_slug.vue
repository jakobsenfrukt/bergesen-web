<template>
  <main class="site-main site-main--with-aside">
    <div class="page-content">
      <PageHeader :heading="entry.title" :lead="entry.lead" />
      <div v-html="entry.body" class="page-body"></div>
    </div>
    <SideNav :menuItems="pages" parent="/sok-stotte" parentTitle="Søk støtte" class="page-nav" />
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
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`query GetEntryBySlug($slug: String!) {
        entry(slug: [$slug], site: "default") {
          ... on applyPages_page_Entry {
            title
            lead
            body
            slug
            uri
          }
        }
        pages: entries(section: "applypages", site: "default") {
          ... on applyPages_page_Entry {
            title
            slug
            uri
          }
        }
      }`,
      variables: {
        slug: route.params.slug
      }
    })
    return data
  },
  fetchOnServer: true
}
</script>
