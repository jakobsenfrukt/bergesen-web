<template>
  <div class="grants">
    <nav class="grant-filter">
      <div class="show-all">
        <button>Vis alle</button>
      </div>
      <div class="grant-filter-year">
        <label>
          <span>År</span>
          <select>
            <option>2020</option>
            <option>1992</option>
          </select>
        </label>
      </div>
      <div class="grant-filter-month">
        <label>
          <span>Måned</span>
          <select>
            <option>August</option>
            <option>Nei</option>
          </select>
        </label>
      </div>
      <div class="grant-filter-search">
        <label>
          <span>Søk</span>
          <input type="text" v-model="searchInput" @input="search" />
          {{ searchInput }}
        </label>
      </div>
    </nav>
    <ul class="grant-list">
      <GrantItem v-for="(grant, index) in grants" :key="index" :grant="grant" />
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data: function() {
    return {
      searchInput: "",
      grants: []
    }
  },
  methods: {
    async search() {
      console.log('søker')
      try {
        const result = await this.$apollo.query({
          query: gql`query GetSearchResult($searchInput: String!) {
            grants: entries(search: $searchInput, section: "grantlist", site: "default") {
              ... on grantlist_grant_Entry {
                title
                projectname
                grantedsum
                date
                mainimage {
                  url
                  ... on assets_Asset {
                    alt
                  }
                }
                lead
              }
            }
          }`,
          variables: {
            searchInput: this.searchInput
          }
        }).then(({data}) => data && data.grants)
        this.grants = result
      } catch (e) {
        console.error(e)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.grant-filter {
  display: flex;
  margin: $spacing-l 0 1rem;

  div {
    margin-right: 1rem;
  }
}
.grant-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0 auto $spacing-l;
  border-top: 2px solid $color-text;
}
</style>
