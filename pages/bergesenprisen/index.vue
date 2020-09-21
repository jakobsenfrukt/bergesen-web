<template>
  <main class="site-main">
    <PageHeader :heading="entry.title" :lead="entry.lead" />
    <div v-html="entry.body" class="page-body"></div>
    <WinnerList :winners="winners" heading="Vinnere av Bergesenprisen" />
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
      entry(type: "award", site: "default") {
        ... on award_award_Entry {
          title
          lead
          body
        }
      }
    }`,
    winners: gql`{
      winners: entries(section: "awardwinners", site: "default") {
        ... on awardwinners_awardwinner_Entry {
          title
          lead
          mainimage {
            url
          }
          postDate
          slug
          uri
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
