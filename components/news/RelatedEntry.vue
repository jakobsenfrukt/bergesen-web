<template>
  <aside class="related" :class="{ winner: winner, grant: grant, entry: entry }">
    <template v-if="winner">
      <span class="winner-meta">Mottaker av Bergesenprisen <Date :rawDate="winner.postDate" yearonly class="date" /></span>
      <h2 class="winner-name">{{ winner.title }}</h2>
      <p class="winner-lead">{{ winner.lead }}</p>
      <NLink :to="`/${winner.uri}`" class="winner-link">Les mer</NLink>
    </template>
    <template v-else-if="grant">
      <span class="grant-meta">Tildeling <Date :rawDate="grant.date" short class="date" /></span>
      <h2 class="grant-title">{{ grant.title }}: {{ grant.projectname }}</h2>
      <span class="grant-sum">kr {{ Number(grant.grantedsum).toLocaleString('nb-NO') }}</span>
      <NLink to="/tildelinger" class="grant-link">Se alle tildelinger</NLink>
    </template>
    <template v-else>
      <h2 class="entry-name">{{ entry.title }}</h2>
      <p class="entry-lead">{{ entry.lead }}</p>
      <NLink to="/bergesenprisen" class="entry-link">Les mer</NLink>
    </template>
  </aside>
</template>

<script>
export default {
  props: {
    winner: Object,
    grant: Object,
    entry: Object
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.related {
  color: $color-darkestgreen;
  width: 100%;
  grid-column: 9 / span 3;
  align-self: start;
  margin: 1rem 0 $spacing-m;
  border: 1px solid $color-darkestgreen;
  padding: 1rem 1.6rem 2rem;


  .winner {
    &-name {
      font-size: 1.4rem;
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
      font-size: 1.4rem;
      margin-bottom: .5rem;
    }
    &-meta,
    &-sum {
      font-family: $sans-serif;
      font-size: 16px;
    }
  }

  .entry {
    &-name {
      font-size: 1.4rem;
      margin: .5rem 0;
    }
    &-lead {
      margin: 0 0 1rem;
    }
  }

  .date {
    text-transform: lowercase;
  }

  a {
    color: inherit;
    font-family: $sans-serif;
    font-weight: 700;
    display: block;
    margin-top: 1rem;
  }
}
@media (max-width: $media-s) {
  .related {
    grid-column: 1 / span 12;
  }
}
</style>
