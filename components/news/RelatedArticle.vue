<template>
  <article class="article">
    <div class="article-image">
      <div class="image-wrapper">
        <img v-if="article.mainimage[0]" :src="article.mainimage[0].url" :alt="article.mainimage[0].alt" :title="article.mainimage[0].credit" />
        <img v-else-if="article.graphic[0]" :src="article.graphic[0].url" alt="Grafisk form i Bergesenstiftelsens farger" class="graphic" />
      </div>
    </div>
    <div class="article-text">
      <span class="article-meta">{{ t.meta }}</span>
      <h2 class="article-title">
        {{ article.title }}
      </h2>
      <p class="article-lead">{{ article.lead }}</p>
      <NLink :to="`/${article.uri}`" class="article-link read-more">{{ t.readmore }}</NLink>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    article: Object
  },
  data() {
    return {
      no: {
        meta: "Relatert artikkel",
        readmore: "Les artikkelen"
      },
      en: {
        meta: "Related article",
        readmore: "Read more"
      },
    }
  },
  computed: {
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
    background: $color-green;
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

      &.graphic {
        filter: grayscale(0);
      }
    }
  }
  &:hover {
    .article-image img {
      filter: grayscale(0);
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

  &-meta {
    display: block;
    font-size: .9rem;
    font-family: $sans-serif;
    color: $color-darkgreen;
    text-transform: uppercase;
    letter-spacing: .016em;
    font-weight: 500;
    margin-bottom: .24rem;
  }

  a {
    color: inherit;
    font-family: $sans-serif;
    font-weight: 700;
    display: block;
  }
}
@media (max-width: $media-s) {
  .article {
    grid-column: 1 / span 12;
    display: block;
    &-text {
      margin: 0;
      padding-top: 1.5rem;
    }
  }
}
</style>
