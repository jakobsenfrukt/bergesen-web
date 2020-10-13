<template>
  <main class="site-main site-main--with-aside">
    <BackgroundShape page="apply" />
    <div class="page-content">
      <PageHeaderSimple :heading="entry.title" :lead="entry.lead" />
      <div v-html="entry.body" class="page-body"></div>
      <DeadlineList v-if="entry.deadlines" :deadlines="entry.deadlines" />
      <Button :href="entry.applicationForm[0].url" text="Download application form" />
    </div>
    <SideNav :menuItems="pages" :parent="entry.uri" :parentTitle="entry.title" class="page-nav" />
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
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`{
        entry(type: "apply", site: "bergesenstiftelsenEn") {
          ... on apply_apply_Entry {
            title
            deadlines(limit: 5) {
              ... on deadlines_deadline_BlockType {
                date
                details
              }
            }
            applicationForm {
              url
            }
            lead
            body
            uri
          }
        }
        pages: entries(section: "applypages", site: "bergesenstiftelsenEn") {
          title
          slug
          uri
        }
      }`
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
