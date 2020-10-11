<template>
  <button class="loadmore">
    {{ loading ? 'Vent...' : t.load }}
  </button>
</template>

<script>
export default {
  props: {
    loading: Boolean
  },
  data() {
    return {
      no: {
        load: "Last inn flere"
      },
      en: {
        load: "Load more"
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


<style lang="scss">
@import '@/assets/css/variables.scss';
button {
  display: block;
  min-width: 51%;
  max-width: 32rem;
  margin: 2rem auto $spacing-m;
  text-align: center;
  background: $color-lightgreen;
  padding: 1rem 2rem;
  padding-left: 2rem;
  color: $color-blue;
  border-radius: 2em;
  border: none;
  position: relative;
  font-size: 1.4rem;
  transition: all .3s ease;
  font-family: $sans-serif;

  &:hover {
    cursor: pointer;
    background: $color-green;
  }
}
@media (max-width: $media-s) {
  button {
    font-size: 1.2rem;
    width: 100%;
  }
}
</style>
