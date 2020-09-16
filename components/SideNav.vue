<template>
  <nav v-if="menuItems" class="side-nav">
    <ul>
      <li v-for="(item, index) in menuItems" :key="index">
        <NLink :to="item.uri">{{ item.title }}</NLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import gql from 'graphql-tag'
export default {
  props: {
    menuItems: Array
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.side-nav {
  display: block;
  background: #fefefe;
}
</style>
