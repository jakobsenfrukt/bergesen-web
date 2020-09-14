<template>
  <main>
    <PageHeader :heading="entry.title" :lead="entry.lead" />
    <ul>
      <li v-for="(grant, index) in grants" :key="index">
        {{ grant.title }}
      </li>
    </ul>
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
  computed: {
    grants() {
      return this.$store.state.entries.filter(entry => entry.__typename === "grantlist_grant_Entry");
    }
  },
  apollo: {
    entry: gql`{
      entry(type: "grants", site: "default") {
        ... on grants_grants_Entry {
          title
          lead
        }
      }
    }`
  },
  head() {
    return {
      title: this.entry.title + ' | Bergesenstiftelsen',
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
