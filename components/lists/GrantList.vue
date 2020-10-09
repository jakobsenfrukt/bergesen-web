<template>
  <div class="grants-wrapper">
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
        <div v-if="searching" class="loading">
          <div class="loading-icon">
            <img src="/graphics/icons/loading.svg" alt="Loading..." />
          </div>
        </div>
      </nav>
      <ul v-if="grants.length" class="grant-list">
        <GrantItem v-for="(grant, index) in grants" :key="index" :grant="grant" />
      </ul>
      <ul v-if="grants.length" class="grant-list">
        <GrantItemAlt v-for="(grant, index) in grants" :key="index" :grant="grant" />
      </ul>
      <ul v-if="grants.length" class="grant-list">
        <GrantItemAlt2 v-for="(grant, index) in grants" :key="index" :grant="grant" />
      </ul>
      <div v-else class="no-results">
        <p>Ingen tildelinger matcher ditt søk.</p>
      </div>
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
.grants, .grants-wrapper {
  grid-column: 1 / span 12;
}
.grants-wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  background: $color-lightestgray;
  width: calc(100% + 4rem);
  margin: 0 -2rem 0;
  padding: 2rem;

  background-image: url('/graphics/shapes/Bergesen1.svg');
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 50%;
  background-attachment: fixed;
}
.grant-filter {
  display: flex;
  margin: 0 0 1rem;
  font-family: $sans-serif;

  div {
    margin-right: 1rem;
  }
  span {
    display: inline-block;
  }

  select, input, button {
    font-family: $sans-serif;
    font-size: 1rem;
    padding: .3rem .5rem;
    margin: 0 1rem 0 .5rem;
    border: 2px solid $color-green;
    background: $color-lightestgray;
  }
  input, select {
    display: inline-block;
    padding: .5rem 1rem;
    margin: 0 .24rem;
    font-size: 1rem;
    font-family: $sans-serif;
    border-radius: 2rem;
    background: transparent;
    color: $color-text;
    &::placeholder {
      color: $color-text;
      opacity: .6;
      transition: opacity .3s ease;
    }
    &:focus {
      background: $color-background;
      outline: none;
      &::placeholder {
        color: $color-text;
        opacity: 0;
      }
    }
  }
  button {
    margin-left: 0;
    padding: .5rem 1rem;
    margin: 0;
    outline: none;
    border-radius: 2rem;
    background: $color-green;
    font-size: 1rem;
    font-family: $sans-serif;
    font-weight: 500;
    width: 100%;
    &:hover {
      cursor: pointer;
    }
  }
}
.grant-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0 auto $spacing-l;
}
.loading {
  width: 2rem;
  height: 2rem;
  &-icon {
    width: 100%;
    img {
      animation: load 1.7s linear infinite;
      transform-origin: center center;
    }
  }
}
@keyframes load {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.no-results {
  padding: 2rem 0;
  max-width: none;
  margin: 0 auto $spacing-l;

  p {
    font-style: italic;
    font-size: 1.4rem;
    margin: 0;
  }
}

@media (min-width: $media-grantlist) {
  .grants {
    grid-column: 2 / span 10;
  }
}
</style>
