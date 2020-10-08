<template>
  <div class="grants">
    <nav class="grant-filter">
      <div class="show-all">
        <button @click="reset">Vis alle</button>
      </div>
      <div class="grant-filter-year">
        <label>
          <span>År</span>
          <select v-model="year" @change="search">
            <option>2020</option>
            <option>1992</option>
            <option>1993</option>
            <option>1994</option>
            <option>1995</option>
          </select>
        </label>
      </div>
      <div class="grant-filter-search">
        <label>
          <span>Søk</span>
          <input type="text" v-model="searchInput" @input="search" />
        </label>
      </div>
      <div v-if="searching">vent</div>
    </nav>
    <ul v-if="grants.length" class="grant-list">
      <GrantItem v-for="(grant, index) in grants" :key="index" :grant="grant" />
    </ul>
    <div v-else class="no-results">
      <p>Ingen tildelinger matcher ditt søk.</p>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data: function() {
    return {
      searchInput: "",
      grants: [],
      year: "",
      limit: 20,
      offset: 0,
      searching: false,
    }
  },
  computed: {
    dateFilter() {
      const zeroPad = (num, places) => String(num).padStart(places, '0')
      const year = this.year && parseInt(this.year)
      if (year) {
        return ["and", `>= ${year}-01-01T00:00:00Z`, `< ${year + 1}-01-01T00:00:00Z`]
      }
      return []
    },
  },
  mounted() {
    this.search()
  },
  methods: {
    reset() {
      this.year = ""
      this.searchInput = ""
      this.search()
    },
    async search() {
      this.searching = true
      console.log('søker etter', this.searchInput, 'med', this.dateFilter)
      try {
        const result = await this.$apollo.query({
          query: gql`query GetSearchResult($searchInput: String!, $date: [QueryArgument]) {
            grants: entries(search: $searchInput, section: "grantlist", site: "default", date: $date, orderBy: "date DESC") {
              ... on grantlist_grant_Entry {
                title
                projectname
                grantedsum
                date
                mainimage {
                  url(transform: "thumb")
                  ... on assets_Asset {
                    alt
                    credit
                  }
                }
                relatedarticle {
                  ... on newsarticles_newsarticle_Entry {
                    title
                    lead
                    postDate
                    mainimage {
                      url(transform: "thumb")
                      ... on assets_Asset {
                        alt
                        credit
                      }
                    }
                    slug
                    uri
                  }
                }
                lead
              }
            }
          }`,
          variables: {
            searchInput: this.searchInput,
            date: this.dateFilter,
          }
        }).then(({data}) => data && data.grants)
        this.grants = result
      } catch (e) {
        console.error(e)
      } finally {
        this.searching = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.grants {
  grid-column: 1 / span 12;
}
.grant-filter {
  display: flex;
  margin: $spacing-l 0 1rem;
  font-family: $sans-serif;

  div {
    margin-right: 1rem;
  }

  select, input, button {
    font-family: $sans-serif;
    font-size: 1rem;
    padding: .3rem .5rem;
    margin: 0 1rem 0 .5rem;
    border: 1px solid $color-text;
    background: $color-lightestgray;
  }
  button {
    margin-left: 0;
    padding: .3rem 1rem;
  }
}
.grant-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0 auto $spacing-l;
  border-top: 2px solid $color-text;
}
.no-results {
  padding: 2rem 0;
  max-width: none;
  margin: 0 auto $spacing-l;
  border-top: 2px solid $color-text;
  border-bottom: 1px solid $color-text;

  p {
    font-style: italic;
    font-size: 1.4rem;
    margin: 0;
  }
}

@media (min-width: $media-xl) {
  .grants {
    grid-column: 2 / span 10;
  }
}
</style>
