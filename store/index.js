import gql from 'graphql-tag'

export const state = () => ({
  entries: [],
})

export const mutations = {
  setEntries(state, entries) {
    state.entries = entries
  },
}

export const actions = {
  async nuxtServerInit ({ commit }, { app }) {
    const client = app.apolloProvider.defaultClient;
    const entries = gql`{
      entries {
        __typename
        id
        title
        slug
        uri
        ... on newsarticles_newsarticle_Entry {
          lead
          mainimage {
            url
          }
        }
        ... on applyPages_page_Entry {
          title
        }
      }
    }`;
    await client.query({ query: entries }).then(response => {
      commit('setEntries', response.data.entries)
    });
  }
}
