<template>
  <ul class="winner-list">
    <h2 v-if="heading" class="winner-list__heading">{{ heading }}</h2>
    <li v-for="(winner, index) in winners" :key="index" class="winner">
      <div class="winner-image">
        <div class="image-wrapper">
          <img v-if="winner.mainimage.length" :src="winner.mainimage[0].url" :alt="winner.mainimage[0].alt" :title="winner.mainimage[0].credit" />
        </div>
      </div>
      <div class="winner-text">
        <Date :rawDate="winner.postDate" yearonly class="winner-year" />
        <h3 class="winner-name">{{ winner.title }}</h3>
        <p class="winner-lead">{{ winner.lead }}</p>
        <NLink v-if="winner.body" :to="`/bergesenprisen/${winner.slug}`" class="winner-link read-more">Les mer</NLink>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    winners: Array,
    heading: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.winner-list {
  list-style: none;
  margin: 0 0 $spacing-l;
  padding: 0;
  grid-column: 3 / span 8;
}
.winner {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(8, 1fr);
  grid-column-gap: 2rem;
  margin: 0 0 $spacing-m;

  &-image {
    grid-column: 1 / span 3;
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
      &:hover {
        filter: grayscale(0);
      }
    }
  }

  &-text {
    grid-column: 4 / span 5;
  }

  &-name {
    font-size: 2rem;
    margin-bottom: $spacing-s;
  }

  &-lead {
    font-family: $sans-serif;
    font-weight: 500;
  }

  &-year {
    font-size: 1.6rem;
    font-family: $sans-serif;
    color: $color-darkgreen;
  }

  &-link {
    color: inherit;
    font-family: $sans-serif;
  }
}
@media (max-width: $media-s) {
  .section-title {
    font-size: 1rem;
  }
  .winner-list {
    grid-column: 1 / span 12;
  }
  .winner {
    grid-column-gap: 0;
    &-image {
      grid-column: 1 / span 2;
      .image-wrapper {
        padding-top: 100%;
      }
    }

    &-text {
      grid-column: 3 / span 6;
      padding-left: 1rem;
    }

    &-name {
      font-size: 1.4rem;
      margin-bottom: .5rem;
    }

    &-year {
      font-size: 1.6rem;
      line-height: 1;
      display: block;
      margin-bottom: .24rem;
    }

    &-lead {
      line-height: 1.4;
      margin: .5rem 0;
    }
  }
}
</style>
