<template>
  <li class="faq-item" :class="{ open: open }">
    <div class="faq-question" @click="open = !open">{{ faq.question }}</div>
    <div class="faq-answer" :class="{ open: open }">
      <div v-html="faq.answer"></div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    faq: Object
  },
  data() {
    return {
      open: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.faq {
  &-item {
    max-width: 42rem;
    position: relative;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    &:before {
      content: url(/graphics/shapes/Bergesen4.svg);
      width: .6em;
      height: .6em;
      display: block;
      position: absolute;
      top: .4em;
      left: -1em;
      overflow: visible;
      transform: rotate(90deg);
      transform-origin: center center;
      transition: all .3s ease;
    }
    &.open {
      &:before {
        transform: rotate(180deg);
        transform-origin: center center;
        top: .9em;
        left: -1.5em;
      }
    }
  }
  &-question {
    font-family: $sans-serif;
    font-weight: 500;
    line-height: 1.4;
    &:hover {
      cursor: pointer;
    }
  }
  &-answer {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    display: none;

    &.open {
      display: block;
    }
  }
}
</style>
