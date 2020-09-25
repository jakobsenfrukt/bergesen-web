<template>
  <main class="site-main front-page">
    <section class="hero">
      <div class="background">
        <img src="/graphics/shapes/Bergesen15.svg" />
        <img src="/graphics/shapes/Bergesen18.svg" />
        <img src="/graphics/shapes/Bergesen24.svg" />
      </div>
      <div class="index-lead">{{ entry.lead }}</div>
      <div class="index-deadline">
        <h2>Neste søknadsfrist</h2>
        <Date v-if="apply" :rawDate="nextDeadline.date" class="date" />
      </div>
    </section>
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
.index {
  &-lead,
  &-deadline {
    position: relative;
    z-index: 1;
  }
}
.index-lead {
  font-size: 2rem;
  line-height: 1.3;
  text-align: center;
  margin: 0 auto;
  max-width: 800px;
  font-family: $serif-fine;
  color: $color-white;
}
.index-deadline {
  background: $color-white;
  display: inline-block;
  padding: 2rem;
  .date {
    font-family: $sans-serif;
  }
}
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

  &.hero {
    background: transparent;
    padding: 5rem 2rem 5.5rem;
    margin-bottom: 2rem;
  }

  &.apply {
    background: $color-lightgreen;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 4rem;
    .content {
      margin: 0;
    }
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

.background {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;

  img {
    flex: 1;
  }
}
</style>
