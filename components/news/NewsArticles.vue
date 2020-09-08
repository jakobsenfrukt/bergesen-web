<template>
  <div className="news-articles">
    <article v-for="(article, index) in articles" className="article" :key="index">
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
    articles: Array
  }
}
</script>

<style lang="scss" scoped>
article {
  width: 300px;
  font-size: 14px;
  margin-bottom: 3rem;
}
</style>
