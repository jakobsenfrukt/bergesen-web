<template>
  <a class="button" :class="{ secondary: secondary }" :href="href">
    {{ text }}
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


<style lang="scss">
@import '@/assets/css/variables.scss';
.button {
  display: inline-block;
  min-width: 51%;
  max-width: 32rem;
  margin: 1rem auto $spacing-m;
  background: $color-lightgreen;
  padding: 1rem 6rem 1rem 2rem;
  padding-left: 2rem;
  color: $color-blue;
  text-decoration: none;
  border-radius: 2em;
  position: relative;
  font-size: 1.4rem;
  transition: all .3s ease;
  font-family: $sans-serif;

  &.secondary {
    background: $color-lightgreen;
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
    padding: 1rem 4rem 1rem 4rem;
    &:before {
      opacity: 1;
      transform: translateX(0);
    }
  }

  + .button {
    margin-top: -$spacing-m;
  }
}
@media (max-width: $media-s) {
  .button {
    font-size: 1.2rem;
  }
}
</style>
