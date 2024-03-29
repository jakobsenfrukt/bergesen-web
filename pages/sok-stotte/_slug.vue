<template>
  <main class="site-main site-main--with-aside">
    <BackgroundShape page="apply" />
    <div class="page-content">
      <PageHeaderSimple :heading="entry.title" :lead="entry.lead" />
      <div v-if="entry.body" v-html="entry.body" class="page-body"></div>
      <FaqList v-if="entry.faq" :faq="entry.faq" />
      <DownloadList v-if="entry.downloadFiles" :files="entry.downloadFiles" />
      <ApplyButton />
    </div>
    <SideNav
      :menuItems="pages"
      parent="sok-stotte"
      :parentTitle="parent.title"
      class="page-nav"
    />
  </main>
</template>

<script>
import gql from "graphql-tag";
import ApplyButton from "@/components/ApplyButton.vue";

export default {
  components: {
    ApplyButton
  },
  data() {
    return {
      entry: {}
    };
  },
  async asyncData({ app, route, error }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`
        query GetEntryByUri($uri: String!) {
          entry(uri: [$uri], site: "default") {
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
              showButton
              slug
              uri
            }
          }
          pages: entries(section: "applypages", site: "default") {
            title
            slug
            uri
          }
          parent: entry(type: "apply", site: "default") {
            ... on apply_apply_Entry {
              title
            }
          }
        }
      `,
      variables: {
        uri: route.path.slice(1)
      }
    })
    if (data.entry === null) {
      error({ statusCode: 404, message: 'Page not found' })
      return {}
    }
    return data
  },
  fetchOnServer: true,
  head() {
    return {
      title: this.entry.title + " | Bergesenstiftelsen",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.entry.lead
        },
        {
          property: "og:image",
          content: "/ogimage.png"
        }
      ]
    };
  }
};
</script>
