<template>
  <main class="site-main">
    {{ ogimage }}
    <BackgroundShape page="award" />
    <PageHeader v-if="entry.mainimage.length" :heading="entry.title" :lead="entry.lead" :year="entry.postDate" :image="entry.mainimage[0]" />
    <PageHeader v-else :heading="entry.title" :lead="entry.lead" :year="entry.postDate" />
    <div v-html="entry.body" class="page-body"></div>
    <RelatedEntry :entry="parent" />
    <RelatedArticle v-if="entry.relatedarticle[0]" :article="entry.relatedarticle[0]" />
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
        entry(uri: [$uri], site: "default") {
          ... on awardwinners_awardwinner_Entry {
            title
            lead
            body
            mainimage {
              url(transform: "full")
              ogimage: url(transform: "ogimg")
              ... on assets_Asset {
                alt
                credit
              }
            }
            relatedarticle {
              ... on newsarticles_newsarticle_Entry {
                title
                lead
                postDate
                mainimage {
                  url: url(transform: "thumb")
                  ... on assets_Asset {
                    alt
                    credit
                  }
                }
                graphic {
                  url(transform: "thumb")
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
        parent: entry(type: "award", site: "default") {
          ... on award_award_Entry {
            title
            lead
            body
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
