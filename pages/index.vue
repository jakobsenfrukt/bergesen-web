<template>
  <main>
    <PageHeader :heading="entry.title" :lead="entry.lead" />
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
      entry(site: "default") {
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
      description: this.entry.lead
    }
  }
}
</script>
