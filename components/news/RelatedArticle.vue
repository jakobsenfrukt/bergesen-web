<template>
  <article class="article">
    <div class="article-image">
      <div class="image-wrapper">
        <img :src="article.mainimage[0].url" :alt="article.mainimage[0].alt" />
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
  grid-column: 2 / span 10;
  align-self: start;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-column-gap: 2rem;
  width: 100%;
  margin: 1rem auto $spacing-l;

  &-image {
    grid-column: 1 / span 4;
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
    grid-column: 5 / span 6;
    background: $color-lightestgray;
    padding: 1rem 2rem 2rem;
    margin-left: -2rem;
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
