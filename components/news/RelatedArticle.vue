<template>
  <article class="article">
    <div class="article-image">
      <div class="image-wrapper">
        <img :src="article.mainimage[0].url" />
      </div>
    </div>
    <div class="article-text">
      <h2 class="article-title">{{ article.title }}</h2>
      <p class="article-lead">{{ article.lead }}</p>
      <NLink :to="`/${article.uri}`" class="article-link">Les artikkelen</NLink>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    article: Object
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.article {
  display: grid;
  grid-template-columns: 1fr 1.618fr;
  width: 100%;
  max-width: 54rem;
  margin: 1rem auto $spacing-m;

  &-image {
    .image-wrapper {
      width: 100%;
      padding-top: 100%;
      position: relative;
      overflow: hidden;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      object-fit: cover;
      object-position: top;
      filter: grayscale(100%);
      transition: all .3s ease;
    }
  }

  &-text {
    background: $color-lightestgray;
    padding: 1rem 1.6rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &-title {
    font-size: 2rem;
    margin-bottom: .5rem;
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
