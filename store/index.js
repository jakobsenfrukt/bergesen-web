import gql from 'graphql-tag'

export const state = () => ({
  entries: [],
  english: false
})

export const mutations = {
  setEntries(state, entries) {
    state.entries = entries
  },
  setLanguage(state, english) {
    state.english = english
  },
}

export const actions = {
  async nuxtServerInit ({ commit }, { app }) {
    const client = app.apolloProvider.defaultClient;
    const entries = gql`{
      entries {
        __typename
        sectionId
        id
        title
        slug
        uri
        localized {
          title
          slug
          uri
        }
        ... on newsarticles_newsarticle_Entry {
          lead
          mainimage {
            url
          }
        }
        ... on applyPages_page_Entry {
          body
        }
        ... on aboutPages_page_Entry {
          body
        }
      }
    }`;
    await client.query({ query: entries }).then(response => {
      commit('setEntries', response.data.entries)
    });
  }
}
