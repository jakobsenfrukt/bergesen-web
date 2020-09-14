<template>
  <main>
    <PageHeader :heading="entry.title" :lead="entry.lead" />
    <div v-html="entry.body"></div>
    <ul>
      <li v-for="(winner, index) in winners" :key="index">
        {{ winner.title }}
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
    winners() {
      return this.$store.state.entries.filter(entry => entry.__typename === "awardwinners_awardwinner_Entry");
    }
  },
  apollo: {
    entry: gql`{
      entry(type: "award", site: "default") {
        ... on award_award_Entry {
          title
          lead
          body
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
