<template>
  <nav v-if="menuItems" class="side-nav">
    <ul>
      <li v-if="parent" class="parent">
        <NLink :to="`/${parent}`">{{ parentTitle }}</NLink>
      </li>
      <li v-for="(item, index) in menuItems" :key="index" class="child">
        <NLink :to="`/${item.uri}`">{{ item.title }}</NLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import gql from 'graphql-tag'
export default {
  props: {
    menuItems: Array,
    parent: String,
    parentTitle: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.side-nav {
  display: block;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      a {
        display: block;
        text-decoration: none;
        color: inherit;
        padding: .5rem 0;
        border-bottom: 1px solid $color-text;
        position: relative;
        transition: all .3s ease;
        font-family: $sans-serif;
        &:before {
          content: "→";
          display: block;
          position: absolute;
          left: 0;
          opacity: 0;
          transform: translateX(-100%);
          transition: all .3s ease;
        }
        &:hover {
          padding-left: 1.5rem;
          &:before {
            opacity: 1;
            transform: translateX(0);
          }
        }
        &.nuxt-link-exact-active {
          font-style: italic;
          padding-left: 1.5rem;
          &:before {
            opacity: 1;
            transform: translateX(0);
          }
        }
      }

      &.parent {
        a {
          border-width: 2.5px;
          font-weight: 600;
          &.nuxt-link-exact-active {
            font-style: normal;
            padding-left: 0;
            &:before {
              opacity: 0;
              transform: translateX(-100%);
            }
          }
        }
      }
    }
  }
}
</style>
