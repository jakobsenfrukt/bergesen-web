<template>
  <main class="site-main front-page">
    <Hero :lead="entry.lead" :deadline="nextDeadline" :link="apply.uri" />
    <NewsArticles :articles="news" heading="Aktuelt" link="/aktuelt" />
    <section class="apply">
      <div class="content">
        <h2 class="section-title">
          <NLink :to="apply.uri">{{ apply.title }}</NLink>
        </h2>
        <p>{{ apply.lead }}</p>
        <Button href="#" text="Last ned søknadsskjema" />
      </div>
      <SideNav :menuItems="applypages" :parent="apply.uri" :parentTitle="apply.title" class="side-nav" />
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
        news: entries(section: "newsarticles", limit: 4, site: "default") {
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
            title
            lead
            deadlines {
              ... on deadlines_deadline_BlockType {
                date
              }
            }
            uri
          }
        }
        applypages: entries(section: "applypages", site: "default") {
          ... on applyPages_page_Entry {
            title
            slug
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
section {
  margin: 0 -2rem;
  padding: 2rem;
  position: relative;

  .section-title {
    font-size: 2.8rem;
    margin-bottom: $spacing-s;

    a {
      text-decoration: none;
      color: inherit;
    }
  }

  &.apply {
    background: $color-lightgreen;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 4rem;
    .content {
      margin: 0;
    }
    .button {
      background-color: $color-green;
    }
  }
}
@media (max-width: $media-s) {
  section {
    margin: 0 -1rem;
    padding: 2rem;

    &.apply {
      grid-template-columns: 1fr;
    }
  }
}
</style>
