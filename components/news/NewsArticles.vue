<template>
  <div class="news-articles">
    <h2 v-if="heading" class="section-title">
      <NLink v-if="link" :to="link">{{ heading }}</NLink>
      <template v-else>{{ heading }}</template>
    </h2>
    <div class="news-grid">
      <NLink v-for="(article, index) in visibleArticles" class="article" :to="`/${article.uri}`" :key="index">
        <div v-if="article.mainimage.length" class="article-image">
          <div class="image-wrapper">
            <img :src="article.mainimage[0].url" :alt="article.mainimage[0].alt" :title="article.mainimage[0].credit" />
          </div>
        </div>
        <div v-else-if="article.graphic.length" class="article-image">
          <div class="image-wrapper">
            <img :src="article.graphic[0].url" alt="Grafiske former i Bergesenstiftelsens farger" class="color" />
          </div>
        </div>
        <div class="article-text">
          <h1 class="article-title">{{ article.title }}</h1>
          <p v-if="article.lead" class="article-lead">
            {{ article.lead }}
          </p>
          <Date short :rawDate="article.postDate" class="article-date" />
        </div>
      </NLink>
    </div>
    <LoadMore v-if="!hideShowMore && allowMore && hasMore" @click.native="loadMore" />
    <div class="viewall">
      <NLink v-if="index && link" :to="link">{{ t.viewall }}</NLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: Array,
    heading: String,
    link: String,
    allowMore: Boolean,
    index: Boolean
  },
  data() {
    return {
      hideShowMore: false,
      limit: 12,
      currentLimit: 12,
      no: {
        viewall: 'Vis alle artikler'
      },
      en: {
        viewall: 'View all articles'
      }
    }
  },
  computed: {
    hasMore() {
      return this.articles.length > this.currentLimit
    },
    visibleArticles() {
      if (!this.limit) {
        return this.articles
      }
      return this.articles.slice(0, this.currentLimit)
    },
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
  methods: {
    loadMore() {
      this.hideShowMore = true
      this.currentLimit = this.currentLimit + 12
      setTimeout(() => this.hideShowMore = false, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.news-articles {
  margin-top: 2rem;
  grid-column: 1 / span 12;
  .section-title {
    color: $color-red;

    a {
      text-decoration: none;
      color: inherit;
    }
  }
}
.news-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2rem;
  margin-bottom: $spacing-s;
}
.article {
  color: inherit;
  text-decoration: none;
  margin-bottom: $spacing-m;

  &:hover {
    .article-title {
      color: $color-darkgreen;
    }

    .article-image img {
      filter: grayscale(0);
    }
  }

  &-image {
    margin-bottom: $spacing-s;

    .image-wrapper {
      width: 100%;
      padding-top: 100%;
      position: relative;
      margin-bottom: $spacing-s;
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

      &.color {
        filter: none;
      }
    }
  }

  &-title {
    margin-bottom: 0;
    font-size: 1.9rem;
    transition: color .3s ease;
  }

  &-lead {
    font-family: $sans-serif;
    font-weight: 500;
  }

  &-date {
    opacity: .5;
    font-family: $sans-serif;
    font-size: .9rem;
  }
}
.viewall {
  display: block;
  margin: -2rem 0 2rem auto;
  color: $color-darkgreen;
  font-family: $sans-serif;
  font-weight: 700;
  text-align: right;

  a {
    color: inherit;
    text-decoration: none;
    display: inline-block;
    position: relative;
    &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: -.1em;
      left: 0;
      height: 2px;
      width: 100%;
      background: $color-darkgreen;
    }
  }
}
@media (min-width: $media-l) {
  .news-grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
@media (max-width: $media-m) {
  .news-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: $media-s) {
  .news-articles {
    margin-top: 1rem;
  }
  .section-title {
    font-size: 1.6rem;
  }
  .news-grid {
    grid-template-columns: 1fr;
  }
  .article {
    display: grid;
    grid-template-columns: 1fr 1.618fr;

    &-image {
      .image-wrapper {
        padding-top: 100%;
      }
    }

    &-text {
      padding-left: 1rem;
    }

    &-title {
      font-size: 1.4rem;
    }

    &-lead {
      margin: .5rem 0;
    }
  }
  .viewall {
    text-align: left;
  }
}
@media (max-width: $media-l) {
  .front-page .news-grid {
    .article:last-child {
      display: none;
    }
  }
}
@media (max-width: $media-m) {
  .front-page .news-grid {
    .article:last-child {
      display: block;
    }
  }
}
@media (max-width: $media-s) {
  .front-page .news-grid {
    .article:last-child {
      display: none;
    }
  }
}
</style>
