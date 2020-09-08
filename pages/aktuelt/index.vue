<template>
  <main>
    <PageHeader :heading="entry.title" :lead="entry.lead" />
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
  apollo: {
    entry: gql`{
      entry(type: "news", site: "default") {
        ... on news_news_Entry {
          title
          lead
        }
      }
    }`,
    entries: gql`{
      entries(section: "newsarticles", site: "default") {
        ... on newsarticles_newsarticle_Entry {
          title
          lead
          uri
          mainimage {
            url
          }
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
