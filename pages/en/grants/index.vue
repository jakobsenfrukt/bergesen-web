<template>
  <main class="site-main grants-page">
    <PageHeaderSimple :heading="entry.title" :lead="entry.lead" />
    <div v-if="entry.body" v-html="entry.body" class="page-body"></div>
    <GrantList :filterableYears="filterableYears" />
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
  computed: {
    filterableYears() {
      const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
      const first = Number(this.earliest[0].date.slice(0, 4))
      const last = Number(this.latest[0].date.slice(0, 4))
      return range(first, last, 1)
    }
  },
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`{
        entry(type: "grants", site: "bergesenstiftelsenEn") {
          ... on grants_grants_Entry {
            title
            lead
            body
          }
        }
        grants: entries(section: "grantlist", site: "bergesenstiftelsenEn") {
          ... on grantlist_grant_Entry {
            title
            projectname
            grantedsum
            date
            mainimage {
              url(transform: "small")
              ... on assets_Asset {
                alt
                credit
              }
            }
            lead
          }
        }
        earliest: entries(section: "grantlist", site: "bergesenstiftelsenEn", orderBy: "date ASC", limit: 1) {
          ... on grantlist_grant_Entry {
            date
          }
        }
        latest: entries(section: "grantlist", site: "bergesenstiftelsenEn", orderBy: "date DESC", limit: 1) {
          ... on grantlist_grant_Entry {
            date
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

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.grant-filter {
  display: flex;
  margin-bottom: 1rem;

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
.grant {
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid $color-text;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: block;
  }

  &-date {
    width: 16%;
    min-width: 10rem;
  }

  &-details {
    flex: 1;
    font-size: 1.2rem;
    span {
      display: inline-block;
    }
  }
  &-title {
    font-weight: 700;
    &:after {
      content: ": ";
    }
  }
}
@media (max-width: $media-s) {
  .grant {
    display: block;
  }
}
</style>
