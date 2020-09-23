<template>
  <a class="button" :class="{ secondary: secondary }" :href="href">
    <span class="button-text">{{ text }}</span>
  </a>
</template>

<script>
export default {
  props: {
    href: String,
    text: String,
    secondary: Boolean
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.button {
  display: inline-block;
  min-width: 51%;
  max-width: 32rem;
  margin: 1rem auto $spacing-s;
  background: $color-green;
  padding: 1rem 6rem 1rem 2rem;
  color: $color-blue;
  text-decoration: none;
  border-radius: 2em;
  position: relative;
  font-size: 1.4rem;

  &.secondary {
    background: $color-lightgreen;
  }

  span {
    display: block;
    transition: all .3s ease;
  }

  &:before {
    content: "→";
    display: block;
    font-family: $sans-serif;
    position: absolute;
    left: 2rem;
    opacity: 0;
    transform: translateX(-100%);
    transition: all .3s ease;
  }
  &:hover {
    span {
      transform: translateX(1.5em);
    }
    &:before {
      opacity: 1;
      transform: translateX(0);
    }
  }

  + .button {
    margin-top: -$spacing-m;
  }
}
</style>
