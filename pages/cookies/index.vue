<template>
  <main class="site-main">
    <BackgroundShape page="cookies" />
    <PageHeaderSimple :heading="entry.title" :lead="entry.lead" />
    <div v-html="entry.body" class="page-body"></div>
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
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`{
        entry(type: "cookies", site: "default") {
          ... on cookies_cookies_Entry {
            title
            lead
            body
          }
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
