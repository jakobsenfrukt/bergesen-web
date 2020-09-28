<template>
  <main class="site-main">
    <PageHeader :heading="entry.title" :lead="entry.lead" :date="entry.postDate" />
    <RelatedEntry v-if="entry.relatedWinner[0]" :winner="entry.relatedWinner[0]" />
    <RelatedEntry v-if="entry.relatedGrant[0]" :grant="entry.relatedGrant[0]" />
    <img v-if="entry.mainimage.length" :src="entry.mainimage[0].url" class="article-mainimage" />
    <div v-html="entry.body" class="page-body"></div>
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
          ... on newsarticles_newsarticle_Entry {
            title
            lead
            body
            relatedWinner {
              ... on awardwinners_awardwinner_Entry {
                id
                title
                lead
                body
                postDate
                slug
                uri
              }
            }
            relatedGrant {
              ... on grantlist_grant_Entry {
                title
                projectname
                date
                grantedsum
                lead
                slug
                uri
              }
            }
            postDate
            slug
            uri
            mainimage {
              url
            }
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

<style lang="scss" scoped>
.article-mainimage {
  display: block;
  width: 100%;
  max-width: 54rem;
  margin: 0 auto;
}
</style>
