<template>
  <main class="site-main">
    <PageHeaderSimple :heading="entry.title" :lead="entry.lead" />
    <NewsArticles :articles="entries" />
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
        entry(type: "news", site: "default") {
          ... on news_news_Entry {
            title
            lead
          }
        }
        entries(section: "newsarticles", site: "default") {
          ... on newsarticles_newsarticle_Entry {
            title
            lead
            postDate
            slug
            uri
            mainimage {
              url(transform: "thumb")
              ... on assets_Asset {
                alt
                credit
              }
            }
            graphic {
              url(transform: "thumb")
            }
          }
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
