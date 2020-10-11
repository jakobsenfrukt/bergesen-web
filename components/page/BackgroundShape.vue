<template>
  <div class="background" :class="classes"></div>
</template>

<script>
export default {
  props: {
    page: String
  },
  computed: {
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
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background-image: url('/graphics/backgrounds/bg5.svg');
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: 100%;

  &.award {
    background-image: url('/graphics/backgrounds/bg4.svg');
  }
  &.contact {
    background-image: url('/graphics/backgrounds/bg6.svg');
  }
  &.about {
    background-image: url('/graphics/backgrounds/bg7.svg');
  }
}
</style>
