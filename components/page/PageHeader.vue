<template>
  <div class="page-header" :class="classes">
    <div class="text">
      <h1 class="page-title">
        <span v-if="year">{{ t.winnerheading }} <Date :rawDate="year" yearonly class="winner-year" /></span>
        {{ heading }}
      </h1>
      <p v-if="lead" class="lead">
        {{ lead }}
      </p>
      <Date v-if="date" short :rawDate="date" class="date" />
    </div>
    <div v-if="image" class="image">
      <img :src="image.url" :alt="image.alt" :title="image.credit" />
    </div>
    <div v-else-if="graphic" class="graphic">
      <img :src="graphic.url" alt="Grafiske former i Bergesenstiftelsens farger" />
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
    graphic: Object,
    year: String
  },
  data() {
    return {
      no: {
        winnerheading: "Mottaker av Bergesenprisen"
      },
      en: {
        winnerheading: "Recipient of the Bergesen Award"
      }
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
    },
    classes() {
      if (this.image) {
        return 'split image'
      }
      if (this.graphic) {
        return 'split graphic'
      }
      return
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.page-header {
  grid-column: 1 / span 12;
  width: calc(100% + 4rem);
  margin: 0 -2rem 2rem;
  padding: 0 2rem;
  max-width: none;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
  align-items: flex-start;
  .text {
    grid-column: 3 / span 6;
    padding: 2rem 0;
  }

  &.split {
    align-items: flex-end;
    .text {
      grid-column: 2 / span 6;
      grid-template-columns: repeat(6, 1fr);
      display: grid;
      grid-column-gap: 2rem;
      padding: 2rem 5rem 2rem 0;
      width: calc(100% + 4rem);
      margin: 0 -2rem;
      padding: 2rem;
      .page-title, .lead {
        grid-column: 1 / span 6;
        margin: 0 0 1.2rem;
        padding-right: 2rem;
      }
      .lead {
        margin-bottom: 2rem;
      }
    }

    .image, .graphic {
      position: relative;
      padding-top: 100%;
    }
    .image {
      grid-column: 8 / span 5;
      padding-top: 0;
      img {
        position: static;
        max-height: 600px;
        margin: 0 auto;
        vertical-align: bottom;
      }
    }
    .graphic {
      grid-column: 9 / span 3;
      img {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    &.graphic {
      .text {
        grid-column: 2 / span 6;
      }
    }
  }
}
.page-title {
  font-size: 3.2rem;
  line-height: 1.1;
  margin-bottom: 1.2rem;
  span {
    color: $color-darkgreen;
    font-size: 1.6rem;
    font-family: $sans-serif;
    font-weight: 500;
    display: block;
    margin-bottom: .4rem;
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
  max-width: none;
  margin-bottom: 2rem;
}
.date {
  font-family: $sans-serif;
  font-size: .8rem;
  color: $color-lightblue;
  padding-top: 1rem;
  margin-top: 2rem;
  line-height: 1.2;
  border-top: 6px solid $color-green;
  display: inline-block;
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
