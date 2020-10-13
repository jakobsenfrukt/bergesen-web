<template>
  <main class="site-main site-main--with-aside">
    <BackgroundShape page="apply" />
    <div class="page-content">
      <PageHeaderSimple :heading="entry.title" :lead="entry.lead" />
      <div v-if="entry.body" v-html="entry.body" class="page-body"></div>
      <FaqList v-if="entry.faq" :faq="entry.faq" />
      <DownloadList v-if="entry.downloadFiles" :files="entry.downloadFiles" />
      <Button v-if="entry.showButton" :href="apply.applicationForm[0].url" text="Download application form" />
    </div>
    <SideNav :menuItems="pages" parent="sok-stotte" parentTitle="Søk støtte" class="page-nav" />
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
      query: gql`query GetEntryByUri($uri: String!) {
        entry(uri: [$uri], site: "bergesenstiftelsenEn") {
          ... on applyPages_page_Entry {
            title
            lead
            body
            downloadFiles {
              title
              url
            }
            showButton
            slug
            uri
          }
          ... on applyPages_faq_Entry {
            title
            faq {
              ... on faq_questionBlock_BlockType {
                question
                answer
              }
            }
            slug
            uri
          }
        }
        apply: entry(type: "apply", site: "bergesenstiftelsenEn") {
          ... on apply_apply_Entry {
            applicationForm {
              url
            }
          }
        }
        pages: entries(section: "applypages", site: "bergesenstiftelsenEn") {
          title
          slug
          uri
        }
      }`,
      variables: {
        uri: route.path.slice(1)
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
