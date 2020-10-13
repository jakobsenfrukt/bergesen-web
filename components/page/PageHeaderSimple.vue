<template>
  <div class="page-header">
    <div class="wrapper">
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.page-header {
  grid-column: 3 / span 7;
}
.page-title {
  font-size: 3.2rem;
  line-height: 1.1;
  span {
    color: $color-darkgreen;
    font-size: 1.6rem;
    font-family: $sans-serif;
    font-weight: 500;
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
  max-width: none;
  margin-bottom: 2rem;
}
.date {
  font-family: $sans-serif;
}
@media (max-width: $media-m) {
  .page-header {
    grid-column: 3 / span 8;
  }
}
@media (max-width: $media-s) {
  .page-header {
    grid-column: 1 / span 12;
  }
  .page-title {
    font-size: 2rem;
  }
  .lead {
    font-size: 1.2rem;
    line-height: 1.4;
  }
}
</style>
