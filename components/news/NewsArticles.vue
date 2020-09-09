<template>
  <div class="news-articles">
    <h2 v-if="heading" class="section-title">{{ heading }}</h2>
    <div class="news-grid">
      <NLink v-for="(article, index) in articles" class="article" :to="article.uri" :key="index">
        <img class="article-image" :src="article.mainimage[0].url" />
        <h1 class="article-title">{{ article.title }}</h1>
        <p v-if="article.lead" class="article-lead">
          {{ article.lead }}
        </p>
      </NLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: Array,
    limit: Number,
    heading: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.news-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2rem;
  margin-bottom: $spacing-m;
}
.article {
  color: inherit;
  text-decoration: none;

  &:hover {
    opacity: .5;
  }

  &-image {
    width: 100%;
    margin-bottom: $spacing-s;
  }
}
</style>
