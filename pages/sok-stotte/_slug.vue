<template>
  <main class="site-main site-main--with-aside">
    <BackgroundShape page="apply" />
    <div class="page-content">
      <PageHeaderSimple :heading="entry.title" :lead="entry.lead" />
      <div v-if="entry.body" v-html="entry.body" class="page-body"></div>
      <FaqList v-if="entry.faq" :faq="entry.faq" />
      <DownloadList v-if="entry.downloadFiles" :files="entry.downloadFiles" />
    </div>
    <SideNav :menuItems="pages" parent="sok-stotte" parentTitle="Søk støtte" class="page-nav" />
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
            downloadFiles {
              title
              url
            }
            slug
            uri
          }
          ... on applyPages_faq_Entry {
            title
            faq {
              ... on faq_questionBlock_BlockType {
                question
                answer
              }
            }
            slug
            uri
          }
        }
        pages: entries(section: "applypages", site: "default") {
          title
          slug
          uri
        }
      }`,
      variables: {
        slug: route.params.slug
      }
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
