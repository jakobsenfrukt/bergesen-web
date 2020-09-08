<template>
  <header>
    <div class="logo">
      <NLink to="/">
        <img src="/logo.svg" class="logo-svg" />
      </NLink>
    </div>
    <nav v-if="mainmenu && mainmenuEn" class="site-nav">
      <ul v-if="english">
        <li>
          <NLink to="/">Home</NLink>
        </li>
        <li v-for="(item, index) in mainmenuEn.menuitems" :key="index">
          <NLink :to="`/en/${item.slug}`">{{ item.title }}</NLink>
        </li>
        <li>
          <a :href="mainmenu.facebook" target="_blank">Facebook</a>
        </li>
        <li>
          <a :href="mainmenu.instagram" target="_blank">Instagram</a>
        </li>
      </ul>
      <ul v-else>
        <li>
          <NLink to="/">Hjem</NLink>
        </li>
        <li v-for="(item, index) in mainmenu.menuitems" :key="index">
          <NLink :to="`/${item.slug}`">{{ item.title }}</NLink>
        </li>
        <li>
          <a :href="mainmenu.facebook" target="_blank">Facebook</a>
        </li>
        <li>
          <a :href="mainmenu.instagram" target="_blank">Instagram</a>
        </li>
      </ul>
    </nav>
    <nav class="translate">
      <NLink :to="languageLink">{{ language }}</NLink>
    </nav>
  </header>
</template>

<script>
import gql from 'graphql-tag'
export default {
  props: {
    english: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      menuItemsEn: [
        {
          title: 'Home',
          slug: ''
        },
        {
          title: 'Grants',
          slug: 'grants'
        },
        {
          title: 'News',
          slug: 'news'
        },
        {
          title: 'Bergesenprisen',
          slug: 'bergesenprisen'
        },
        {
          title: 'Contact',
          slug: 'contact'
        },
        {
          title: 'About',
          slug: 'about'
        },
        {
          title: 'Apply',
          slug: 'apply'
        }
      ]
    }
  },
  computed: {
    language: function() {
      const currentPath = this.$route.fullPath;
      if (currentPath.substring(0, 3) == "/en") {
        return 'no'
      }
      return 'en'
    },
    slug: function() {
      const currentPath = this.$route.fullPath;
      if (currentPath.substring(0, 3) == "/en") {
        const newPath = currentPath.slice(4);
        return '/' + newPath
      }
      return '/en' + currentPath
    },
    languageLink: function() {
      return this.slug
    }
  },
  apollo: {
    mainmenu: gql`{
      mainmenu: globalSet(title: "mainmenu") {
        ... on mainmenu_GlobalSet {
          menuitems {
            title
            slug
          }
          instagram
          facebook
        }
      }
    }`,
    mainmenuEn: gql`{
      mainmenuEn: globalSet(title: "mainmenu", site: "bergesenstiftelsenEn") {
        ... on mainmenu_GlobalSet {
          menuitems {
            title
            slug
          }
          instagram
          facebook
        }
      }
    }`
  },
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo-svg {
  width: 120px;
}
.site-nav {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
      margin: 0 1rem;
    }
  }
  a {
    color: inherit;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: .01em;
    font-size: .8rem;


    &:hover {
      opacity: .5;
    }
  }
}
.translate {
  display: inline-block;
}
</style>
