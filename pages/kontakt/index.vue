<template>
  <main class="site-main">
    <PageHeader :heading="entry.title" :lead="entry.lead" />
    <div v-html="entry.body" class="page-body"></div>
    <PersonList v-if="people" :people="admin" heading="Kontakt administrasjonen" />
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
    admin() {
      if (!this.people) {
        return
      }
      return this.people.people.filter(person => person.group === "admin");
    }
  },
  apollo: {
    entry: gql`{
      entry(type: "contact", site: "default") {
        ... on contact_contact_Entry {
          title
          lead
          body
        }
      }
    }`,
    people: {
      query: gql`{
        people: entry(id: "295", site: "default") {
          ... on aboutPages_people_Entry {
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
          }
        }
      }`
    }
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
