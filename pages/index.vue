<template>
  <main>
    <section class="hero">
      <div class="index-lead">{{ entry.lead }}</div>
      <div class="index-deadline">
        <h2>Neste søknadsfrist</h2>
        <Date v-if="apply" :rawDate="nextDeadline.date" />
      </div>
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
  computed: {
    nextDeadline() {
      var today = new Date();
      var deadlines = this.apply.deadlines.filter(function(deadline) {
        var deadlineDate = new Date(deadline.date);
        return deadlineDate >= today;
      });
      return deadlines[0]
    }
  },
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`{
        entry(type: "home", site: "default") {
          ... on home_home_Entry {
            title
            lead
          }
        }
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
        apply: entry(type: "apply", site: "default") {
          ... on apply_apply_Entry {
            deadlines {
              ... on deadlines_deadline_BlockType {
                date
              }
            }
            uri
          }
        }
      }`
    })
    return data
  },
  fetchOnServer: true,
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
