<template>
  <main>
    <section class="hero">
      <div class="index-lead">{{ entry.lead }}</div>
    </section>
    <NewsArticles :articles="news" heading="Aktuelt" link="/aktuelt" />
    <section class="apply">
      <h2>Info om å søke støtte</h2>
      <p>Her kommer det en fornuftig tekst og noen viktige lenker.</p>
    </section>
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
  margin: 0 auto;
  max-width: 800px;
}
section {
  margin: 0 -2rem;
  padding: 2rem;

  &.hero {
    background: $color-lightgreen;
    padding: 5rem 2rem 5.5rem;
    margin-bottom: 2rem;
  }

  &.apply {
    background: $color-lightestred;
  }
}
@media (max-width: $media-s) {
  .index-lead {
    font-size: 1.4rem;
  }
  section {
    margin: 0 -1rem;
    padding: 1rem;
  }
}
</style>
