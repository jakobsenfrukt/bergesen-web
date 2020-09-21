<template>
  <main class="site-main--with-aside">
    <div class="page-content">
      <PageHeader :heading="entry.title" :lead="entry.lead" />
      <div v-html="entry.body" class="page-body"></div>
      <PersonList v-if="entry.people" :people="board" heading="Styret" />
      <PersonList v-if="entry.people" :people="admin" heading="Administrasjon" />
    </div>
    <SideNav :menuItems="pages" parent="/om" parentTitle="Om stiftelsen" class="page-nav" />
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
    board() {
      if (!this.entry.people) {
        return
      }
      return this.entry.people.filter(person => person.group === "board");
    },
    admin() {
      if (!this.entry.people) {
        return
      }
      console.log(this.entry.people[0])
      return this.entry.people.filter(person => person.group === "admin");
    }
  },
  apollo: {
    entry: {
      query: gql`query GetEntryBySlug($slug: String!) {
        entry(slug: [$slug], site: "default") {
          ... on aboutPages_page_Entry {
            title
            lead
            body
            slug
            uri
          }
          ... on aboutPages_people_Entry {
            title
            lead
            people {
              ... on people_person_BlockType {
                fullname
                role
                group
                image {
                  url
                }
                phone
                email
              }
            }
            slug
            uri
          }
        }
      }`,
      variables() {
        return {
          slug: this.$route.params.slug
        }
      }
    },
    pages: gql`{
      pages: entries(section: "aboutpages", site: "default") {
        title
        slug
        uri
      }
    }`
  }
}
</script>
