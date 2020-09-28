<template>
  <aside class="related" :class="{ winner: winner, grant: grant }">
    <template v-if="winner">
      <span class="winner-meta">Mottaker av Bergesenprisen <Date :rawDate="winner.postDate" yearonly /></span>
      <h2 class="winner-name">{{ winner.title }}</h2>
      <p class="winner-lead">{{ winner.lead }}</p>
      <NLink :to="`/${winner.uri}`" class="winner-link">Les styrets begrunnelse</NLink>
    </template>
    <template v-else>
      <span class="grant-meta">Tildeling <Date :rawDate="grant.date" short /></span>
      <h2 class="grant-title">{{ grant.title }}: {{ grant.projectname }}</h2>
      <span class="grant-sum">kr {{ grant.grantedsum }}</span>
      <NLink to="/tildelinger" class="grant-link">Se alle tildelinger</NLink>
    </template>
  </aside>
</template>

<script>
export default {
  props: {
    winner: Object,
    grant: Object
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.related {
  color: $color-darkgreen;
  width: 100%;
  max-width: 24rem;
  margin: 1rem 0 $spacing-m;
  border: 1px solid $color-darkgreen;
  padding: 1rem 1.6rem 2rem;


  .winner {
    &-name {
      font-style: italic;
      font-size: 2rem;
      margin-bottom: .5rem;
    }
    &-meta {
      font-family: $sans-serif;
      font-size: 16px;
    }
    &-lead {
      margin: 0 0 1rem;
    }
  }

  .grant {
    &-title {
      font-style: italic;
      margin-bottom: .5rem;
    }
    &-meta,
    &-sum {
      font-family: $sans-serif;
      font-size: 16px;
    }
  }

  a {
    color: inherit;
    font-family: $sans-serif;
    font-weight: 700;
    display: block;
    margin-top: 1rem;
  }
}
</style>
