<template>
  <main>
    <div class="page-content">
      <PageHeader :heading="entry.title" :lead="entry.lead" />
    </div>
    <SideNav :menuItems="pages" class="page-nav" />
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
    pages() {
      return this.$store.state.entries.filter(entry => entry.__typename === "applyPages_page_Entry");
    }
  },
  apollo: {
    entry: gql`{
      entry(type: "apply", site: "default") {
        ... on apply_apply_Entry {
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

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-column-gap: 4rem;
}
.page-content {
  order: 2;
}
.page-nav {
  order: 1;
}
</style>
