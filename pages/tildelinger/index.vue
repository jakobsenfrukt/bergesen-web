<template>
  <main class="site-main">
    <PageHeaderSimple :heading="entry.title" :lead="entry.lead" />
    <div v-if="entry.body" v-html="entry.body" class="page-body"></div>
    <GrantList />
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
        entry(type: "grants", site: "default") {
          ... on grants_grants_Entry {
            title
            lead
            body
          }
        }
        grants: entries(section: "grantlist", site: "default") {
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
