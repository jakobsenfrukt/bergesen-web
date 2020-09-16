<template>
  <main>
    <div class="index-lead">{{ entry.lead }}</div>
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
          postDate
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

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.index-lead {
  font-size: 2rem;
  line-height: 1.3;
  text-align: center;
  margin: 0 auto $spacing-m;
  max-width: 800px;
}
@media (max-width: $media-s) {
  .index-lead {
    font-size: 1.4rem;
  }
}
</style>
