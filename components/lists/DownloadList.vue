<template>
  <ul class="download-list">
    <li v-for="(file, index) in files" :key="index">
      <a :href="file.url" download target="_blank">{{ file.title }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    files: Array
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.download-list {
  list-style: none;
  margin: 1rem 0 $spacing-m;

  li {
    position: relative;
    font-size: 1.4rem;
    margin-bottom: .5rem;
    &:before {
      content: url(/graphics/shapes/Bergesen3.svg);
      width: .6em;
      height: .6em;
      display: block;
      position: absolute;
      top: 0;
      left: -1.4em;
      overflow: visible;
    }
    a {
      font-family: $sans-serif;
      font-weight: 400;
      color: inherit;
    }
  }
}
</style>
