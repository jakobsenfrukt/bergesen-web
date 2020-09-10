<template>
  <main>
    <PageHeader :heading="entry.title" :lead="entry.lead" />
    <img v-if="entry.mainimage" :src="entry.mainimage[0].url" />
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
