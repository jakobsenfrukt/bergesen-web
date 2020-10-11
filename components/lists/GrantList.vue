<template>
  <div class="grants-wrapper">
    <div class="background"></div>
    <div class="grants">
      <div class="filter-toggle" @click="open = !open" :class="{open: open}">
        <span>{{ open ? t.hide : t.show }}</span>
      </div>
      <nav class="grant-filter" :class="{open: open}">
        <div class="show-all">
          <button @click="reset">{{ t.reset }}</button>
        </div>
        <div class="grant-filter-year">
          <label>
            <span>{{ t.year }}</span>
            <select v-model="year" @change="search">
              <option v-for="(yearOption, index) in filterableYears" :key="index">{{ yearOption }}</option>
            </select>
          </label>
        </div>
        <div class="grant-filter-search">
          <label>
            <span>{{ t.search }}</span>
            <input type="text" v-model="searchInput" @input="search" />
          </label>
        </div>
        <div v-if="loading" class="loading">
          <div class="loading-icon">
            <img src="/graphics/icons/loading.svg" alt="Loading..." />
          </div>
        </div>
      </nav>
      <ul v-if="grants.length" class="grant-list">
        <GrantItem v-for="(grant, index) in grants" :key="index" :grant="grant" />
        <div class="grant-list-meta">{{ t.showing }} {{ grants.length }} {{ t.of }} {{ searchCount }} {{ t.grants }}</div>
        <LoadMore v-if="hasMore && !loading" :loading="loading" @click.native="moreResults" />
        <div v-if="loading" class="loading bottom">
          <div class="loading-icon">
            <img src="/graphics/icons/loading.svg" alt="Loading..." />
          </div>
        </div>
      </ul>
      <div v-else class="no-results">
        <p>{{ t.noresults }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    filterableYears: Array,
  },
  data: function() {
    return {
      searchInput: "",
      searchCount: null,
      grants: [],
      internalGrants: [],
      year: "",
      limit: 10,
      step: 10,
      open: false,
      no: {
        show: "Vis søkefilter",
        hide: "Skjul søkefilter",
        reset: "Vis alle",
        search: "Søk",
        year: "År",
        noresults: "Ingen tildelinger matcher ditt søk.",
        showing: "Viser",
        of: "av",
        grants: "tildelinger"
      },
      en: {
        show: "Show search filter",
        hide: "Hide search filter",
        reset: "Show all",
        search: "Search",
        year: "Year",
        noresults: "No grants match your search.",
        showing: "Showing",
        of: "of",
        grants: "grants"
      },
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
    hasMore() {
      if (!this.searchCount) {
        return false
      }
      return this.searchCount > this.grants.length
    },
    loading() {
      return this.$apollo.queries.grants.loading
    },
    english() {
      return this.$store.state.english
    },
    t() {
      if (this.english) {
        return this.en
      }
      return this.no
    }
  },
  fetchOnServer: true,
  apollo: {
    grants: {
      query: gql`
        query GetSearchResult($searchInput: String!, $date: [QueryArgument], $limit: Int!, $offset: Int!) {
          __typename
          grants: entries(search: $searchInput, section: "grantlist", site: "default", date: $date, orderBy: "date DESC", limit: $limit, offset: $offset) {
            __typename
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
          searchCount: entryCount(search: $searchInput, section: "grantlist", site: "default", date: $date)
        }
      `,
      variables () {
        return {
          searchInput: this.searchInput,
          date: this.dateFilter,
          limit: this.limit,
          offset: 0,
        }
      },
      result ({ data, loading }) {
        if (!loading) {
          this.grants = data.grants
          this.searchCount = data.searchCount
        }
      }
    }
  },
  methods: {
    reset() {
      this.year = ""
      this.searchInput = ""
      this.search()
    },
    async search() {
      this.$apollo.queries.grants.refresh()
    },
    async moreResults() {
      if (!this.hasMore) {
        return
      }

      try {
        this.$apollo.queries.grants.fetchMore({
          variables: {
            offset: this.grants.length
          },
          updateQuery: (previous, { fetchMoreResult }) => {
            if (!fetchMoreResult || !fetchMoreResult.grants) {
              return previous
            }
            return {
              ...previous,
              grants: [...previous.grants, ...fetchMoreResult.grants],
            }
          },
        })
      }
      catch (e) {
        return e
      }
    }
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
  margin: 2rem -2rem 0;
  padding: 2rem;

  background-image: url('/graphics/backgrounds/bg8-big-dark.svg');
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: 100%;
  background-attachment: fixed;
}
.background {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background-image: url('/graphics/backgrounds/bg8-big.svg');
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: 100%;
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
    box-shadow: none;
  }
  input, select {
    display: inline-block;
    padding: .5rem 1rem;
    margin: 0 .24rem;
    font-size: 1rem;
    font-family: $sans-serif;
    border-radius: 2rem;
    color: $color-text;
    transition: all .3s ease;
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
  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    &::-ms-expand {
      display: none;
    }
    padding-right: 3rem;
    background-color: $color-lightestgray;
    background-image: url(/graphics/icons/arrow-down.svg);
    background-position: center right;
    background-size: 2rem 2rem;
    background-repeat: no-repeat;
    &:focus {
      background-color: $color-background;
      background-image: url(/graphics/icons/arrow-down.svg);
      background-position: center right;
      background-size: 2rem 2rem;
      background-repeat: no-repeat;
    }
    &:hover {
      cursor: pointer;
    }
  }
  button {
    margin-left: 0;
    padding: .5rem 1rem;
    margin: 0;
    outline: none;
    border-radius: 2rem;
    border-color: $color-lightgreen;
    background: $color-lightgreen;
    font-size: 1rem;
    font-family: $sans-serif;
    font-weight: 500;
    width: 100%;
    transition: all .3s ease;
    &:hover {
      cursor: pointer;
      border-color: $color-green;
      background: $color-green;
    }
  }
}
.filter-toggle {
  font-family: $sans-serif;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  cursor: pointer;
  span {
    display: inline-block;
    position: relative;
    &:before {
      content: url(/graphics/shapes/Bergesen4.svg);
      width: .6em;
      height: .6em;
      display: block;
      position: absolute;
      top: .4em;
      left: -1em;
      overflow: visible;
      transform: rotate(90deg);
      transform-origin: center center;
      transition: all .3s ease;
    }
  }
  &.open {
    span {
      &:before {
        transform: rotate(180deg);
        transform-origin: center center;
        top: .9em;
        left: -1.5em;
      }
    }
  }
  display: none;
}
.grant-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0 auto $spacing-l;

  &-meta {
    font-family: $sans-serif;
    font-weight: 400;
    opacity: .6;
    font-size: .9rem;
  }
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
  &.bottom {
    margin: 2rem auto;
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

@media (max-width: $media-s) {
  .filter-toggle {
    display: block;
  }
  .grant-filter {
    display: none;

    &.open {
      display: block;
    }
    select, input, button {
      display: block;
      margin-bottom: 1rem;
      width: 100%;
    }
    span {
      margin-left: 1.2rem;
    }
  }
}
</style>
