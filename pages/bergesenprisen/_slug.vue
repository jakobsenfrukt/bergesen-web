<template>
  <main class="site-main">
    <div class="page-content">
      <div>Bergesenprisen <Date :rawDate="entry.postDate" yearonly class="winner-year" /></div>
      <PageHeader :heading="entry.title" :lead="entry.lead" />
      <img v-if="entry.mainimage.length" :src="entry.mainimage[0].url" class="article-mainimage" />
      <div v-html="entry.body" class="page-body"></div>
    </div>
  </main>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data() {
    return {
      entry: {}
    }
  },
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`query GetEntryBySlug($slug: String!) {
        entry(slug: [$slug], site: "default") {
          ... on awardwinners_awardwinner_Entry {
            title
            lead
            body
            mainimage {
              url
            }
            postDate
            slug
            uri
          }
        }
      }`,
      variables: {
        slug: route.params.slug
      }
    })
    return data
  },
  fetchOnServer: true
}
</script>
