<template>
  <main>
    <PageHeader :heading="entry.title" :lead="entry.lead" />
  </main>
</template>

<script>
import gql from 'graphql-tag'
export default {
  layout: 'en',
  data: function() {
    return {
      entry: {}
    }
  },
  apollo: {
    entry: gql`{
      entry(type: "home", site: "bergesenstiftelsenEn") {
        ... on home_home_Entry {
          title
          lead
        }
      }
    }`
  },
  head() {
    return {
      title: 'Bergesenstiftelsen',
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
