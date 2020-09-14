<template>
  <main>
    <PageHeader :heading="entry.title" :lead="entry.lead" :date="entry.postDate" />
    <img v-if="entry.mainimage" :src="entry.mainimage[0].url" />
    <div v-html="entry.body"></div>
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
  apollo: {
    entry: {
      query: gql`query GetEntryBySlug($slug: String!) {
        entry(slug: [$slug], site: "default") {
          ... on newsarticles_newsarticle_Entry {
            title
            lead
            body
            postDate
            slug
            uri
            mainimage {
              url
            }
          }
        }
      }`,
      variables() {
        return {
          slug: this.$route.params.slug
        }
      }
    }
  }
}
</script>
