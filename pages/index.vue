<template>
  <main>
    <PageHeader :heading="entry.title" :lead="entry.lead" />
    <NewsArticles :articles="news" heading="Aktuelt" />
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
      entry(type: "home", site: "default") {
        ... on home_home_Entry {
          title
          lead
        }
      }
    }`,
    news: gql`{
      news: entries(section: "newsarticles", limit: 3, site: "default") {
        ... on newsarticles_newsarticle_Entry {
          title
          lead
          slug
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
      title: 'Bergesenstiftelsen',
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
