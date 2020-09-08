<template>
  <div class="news-articles">
    <article v-for="(article, index) in articles" class="article" :key="index">
      <img class="article-image" :src="article.mainimage[0].url" />
      <h1 class="article-title">{{ article.title }}</h1>
      <p v-if="article.lead" class="article-lead">
        {{ article.lead }}
      </p>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    articles: Array,
    limit: Number
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.news-articles {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2rem;
  margin-bottom: $spacing-m;
}
.article {
  &-image {
    width: 100%;
    margin-bottom: $spacing-s;
  }
}
</style>
