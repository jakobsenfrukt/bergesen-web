<template>
  <main class="site-main">
    <BackgroundShape page="award" />
    <PageHeaderSimple :heading="entry.title" :lead="entry.lead" />
    <div v-html="entry.body" class="page-body"></div>
    <WinnerList :winners="winners" heading="Mottakere av Bergesenprisen" />
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
        entry(type: "award", site: "default") {
          ... on award_award_Entry {
            title
            lead
            body
          }
        }
        winners: entries(section: "awardwinners", site: "default") {
          ... on awardwinners_awardwinner_Entry {
            title
            lead
            body
            mainimage {
              url(transform: "thumb")
              ... on assets_Asset {
                alt
                credit
              }
            }
            postDate
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
      title: this.entry.title + ' | Bergesenstiftelsen',
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
