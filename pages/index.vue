<template>
  <main class="site-main front-page">
    <Hero
      :lead="entry.lead"
      :deadline="nextDeadline"
      :link="apply.uri"
      :banner="entry.banner[0].url"
      :colorText="entry.colorText"
      :colorDate="entry.colorDate"
      :colorDateMobile="entry.colorDateMobile"
    />
    <NewsArticles :articles="news" heading="Aktuelt" link="/aktuelt" index />
    <section class="apply">
      <div class="content">
        <h2 class="section-title">
          <NLink :to="apply.uri">{{ apply.title }}</NLink>
        </h2>
        <p class="apply-lead" v-html="applyLead"></p>
        <div v-if="apply.body" v-html="apply.body" class="apply-body"></div>
        <ApplyButton />
      </div>
      <SideNav :menuItems="applypages" :parent="apply.uri" :parentTitle="apply.title" class="side-nav" />
    </section>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import ApplyButton from '@/components/ApplyButton.vue'

export default {
  components: {
    ApplyButton
  },
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
    },
    applyLead() {
      return this.apply.lead ? this.apply.lead.trim().replace(/\n/g, "<br />") : ""
    }
  },
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`{
        entry(type: "home", site: "default") {
          ... on home_home_Entry {
            title
            lead
            banner {
              url
            }
            colorText
            colorDate
            colorDateMobile
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
          title
          slug
          uri
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
        },
        {
          property: 'og:image',
          content: '/ogimage.png'
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
  grid-column: 1 / span 12;

  .section-title {
    font-size: 2.8rem;
    margin-bottom: $spacing-s;

    a {
      text-decoration: none;
      color: inherit;
    }
  }

  &.apply {
    background: $color-lightestgreen;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 2rem;
    .content {
      grid-column: 1 / span 8;
      margin: 0;
    }
    .side-nav {
      grid-column: 10 / span 3;
    }
    .button {
      background-color: $color-green;
      font-weight: 400;
    }
  }
}
@media (max-width: $media-s) {
  section {
    margin: 0 -1rem;
    padding: 2rem 1rem;

    &.apply {
      grid-template-columns: 1fr;
      .content, .side-nav {
        grid-column: 1 / span 1;
      }
    }
  }
}
</style>
