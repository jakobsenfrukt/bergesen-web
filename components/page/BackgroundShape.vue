<template>
  <div class="background" :class="classes"></div>
</template>

<script>
export default {
  props: {
    page: String
  },
  data() {
    return {
      shapes: []
    }
  },
  computed: {
    english() {
      return this.$store.state.english
    },
    classes() {
      return this.page
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.background {
  position: fixed;
  right: -2rem;
  top: 10rem;
  height: 100%;
  width: 46%;
  z-index: -1;
  background-image: url('/graphics/shapes/Bergesen1.svg');
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 100%;

  &.award {
    background-image: url('/graphics/shapes/Bergesen6.svg');
  }
  &.contact {
    background-image: url('/graphics/shapes/Bergesen7.svg');
  }
}
</style>
