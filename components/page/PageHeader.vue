<template>
  <div class="page-header" :class="{ split: image }">
    <div class="wrapper">
      <div class="text">
        <h1 class="page-title">
          <span v-if="year">Bergesenprisen <Date :rawDate="year" yearonly class="winner-year" /></span>
          {{ heading }}
        </h1>
        <p v-if="lead" class="lead">
          {{ lead }}
        </p>
        <Date v-if="date" short :rawDate="date" class="date" />
      </div>
      <img v-if="image" :src="image.url" class="image" :alt="image.alt" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    heading: String,
    lead: String,
    date: String,
    image: Object,
    year: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.page-header {
  margin-bottom: $spacing-m;

  &.split {
    width: calc(100% + 4rem);
    max-width: none;
    background: $color-lightestgray;
    margin: 0 -2rem $spacing-m;
    .wrapper {
      display: grid;
      grid-template-columns: 1.618fr 1fr;
      max-width: 72rem;
      margin: 0 auto;
    }
    .text {
      padding: 3rem;
    }

    .image {
      display: block;
      width: 100%;
      margin-top: 4rem;
    }
  }
}
.page-title {
  font-size: 3.2rem;
  span {
    color: $color-green;
    font-size: 1.4rem;
    font-family: $serif-extended;
    display: block;
    span {
      display: inline-block;
    }
  }
}
.lead {
  font-size: 1.5rem;

  font-family: $sans-serif;
  font-weight: 400;
  line-height: 1.4;
}
.date {
  font-family: $sans-serif;
}
@media (max-width: $media-s) {
  .page-title {
    font-size: 2rem;
  }
  .lead {
    font-size: 1.2rem;
    line-height: 1.4;
  }
}
</style>
