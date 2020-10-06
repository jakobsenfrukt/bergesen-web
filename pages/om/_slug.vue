<template>
  <main class="site-main site-main--with-aside">
    <div class="page-content">
      <PageHeader :heading="entry.title" :lead="entry.lead" />
      <div v-if="entry.body" v-html="entry.body" class="page-body"></div>
      <PersonList v-if="entry.people" :people="board" />
      <!--<PersonList v-if="entry.people" :people="admin" heading="Administrasjon" />-->
      <DownloadList v-if="entry.downloadFiles" :files="entry.downloadFiles" />
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
      return this.entry.people.filter(person => person.group === "admin");
    }
  },
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`query GetEntryBySlug($slug: String!) {
        entry(slug: [$slug], site: "default") {
          ... on aboutPages_page_Entry {
            title
            lead
            body
            downloadFiles {
              title
              url
            }
            slug
            uri
          }
          ... on aboutPages_people_Entry {
            title
            lead
            body
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
        pages: entries(section: "aboutpages", site: "default") {
          ... on aboutPages_page_Entry {
            title
            slug
            uri
          }
          ... on aboutPages_people_Entry {
            title
            slug
            uri
          }
        }
      }`,
      variables: {
        slug: route.params.slug
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
        }
      ]
    }
  }
}
</script>
