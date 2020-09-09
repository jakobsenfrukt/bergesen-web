<template>
  <main>
    <PageHeader :heading="entry.title" :lead="entry.lead" />
    <ul>
      <li v-for="(page, index) in pages" :key="index">
        <NLink :to="page.uri">{{ page.title }}</NLink>
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
    pages() {
      return this.$store.state.entries.filter(entry => entry.__typename === "aboutPages_page_Entry");
    }
  },
  apollo: {
    entry: gql`{
      entry(type: "about", site: "default") {
        ... on about_about_Entry {
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
