<template>
  <main class="site-main">
    <BackgroundShape page="article" />
    <PageHeader v-if="entry.mainimage.length" :heading="entry.title" :lead="entry.lead" :date="entry.postDate" :image="entry.mainimage[0]" />
    <PageHeader v-else-if="entry.graphic.length" :heading="entry.title" :lead="entry.lead" :date="entry.postDate" :graphic="entry.graphic[0]" />
    <PageHeader v-else :heading="entry.title" :lead="entry.lead" :date="entry.postDate" />
    <div v-html="entry.body" class="page-body"></div>
    <RelatedEntry v-if="entry.relatedWinner[0]" :winner="entry.relatedWinner[0]" />
    <RelatedEntry v-if="entry.relatedGrant[0]" :grant="entry.relatedGrant[0]" />
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
  computed: {
    ogimage() {
      if (this.entry.mainimage.length) {
        return this.entry.mainimage[0].ogimage
      }
      return '/ogimage.png'
    }
  },
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`query GetEntryByUri($uri: String!) {
        entry(uri: [$uri], site: "bergesenstiftelsenEn") {
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
              url: url(transform: "full")
              ogimage: url(transform: "ogimg")
              ... on assets_Asset {
                alt
                credit
              }
            }
            graphic {
              url(transform: "full")
            }
          }
        }
      }`,
      variables: {
        uri: route.path.slice(1)
      }
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
          content: this.ogimage
        }
      ]
    }
  }
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
