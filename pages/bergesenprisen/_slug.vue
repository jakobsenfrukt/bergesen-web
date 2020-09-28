<template>
  <main class="site-main">
    <div class="page-content">
      <PageHeader v-if="entry.mainimage.length" :heading="entry.title" :lead="entry.lead" :year="entry.postDate" :image="entry.mainimage[0].url" />
      <PageHeader v-else :heading="entry.title" :lead="entry.lead" />
      <div v-html="entry.body" class="page-body"></div>
      <RelatedArticle v-if="entry.relatedarticle[0]" :article="entry.relatedarticle[0]" />
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
            relatedarticle {
              ... on newsarticles_newsarticle_Entry {
                title
                lead
                postDate
                mainimage {
                  url
                }
                slug
                uri
              }
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
