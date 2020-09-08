<template>
  <header>
    <div class="logo">
      <NLink :to="english ? '/en/' : '/'">
        <img src="/logo.svg" class="logo-svg" />
      </NLink>
    </div>
    <nav v-if="mainmenu" class="site-nav">
      <ul>
        <template v-if="english">
          <li>
            <NLink to="/en/">Home</NLink>
          </li>
          <li v-for="(item, index) in mainmenu.menuitems" :key="index">
            <NLink :to="`/en/${item.localized[0].slug}`">{{ item.localized[0].title }}</NLink>
          </li>
        </template>
        <template v-else>
          <li>
            <NLink to="/">Hjem</NLink>
          </li>
          <li v-for="(item, index) in mainmenu.menuitems" :key="index">
            <NLink :to="`/${item.slug}`">{{ item.title }}</NLink>
          </li>
        </template>
        <li>
          <a :href="mainmenu.facebook" target="_blank">Facebook</a>
        </li>
        <li>
          <a :href="mainmenu.instagram" target="_blank">Instagram</a>
        </li>
      </ul>
    </nav>
    <nav class="translate">
      <NLink :to="newSlug">{{ language }}</NLink>
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
  computed: {
    language: function() {
      const currentPath = this.$route.fullPath;
      if (currentPath.substring(0, 3) == "/en") {
        return 'no'
      }
      return 'en'
    },
    currentSlug: function() {
      const currentPath = this.$route.fullPath;
      if (currentPath.substring(0, 3) == "/en") {
        const newPath = currentPath.slice(4);
        return newPath
      }
      return currentPath.slice(1)
    },
    newSlug: function() {
      if (this.$route.path === "/") {
        return "/en/"
      } else if (this.$route.path.substring(0, 3) == "/en") {
        return "/"
      }
      const entry = this.entries.filter(entry => entry.slug === this.currentSlug);
      if (this.english) {
        return '/' + entry[0].slug
      }
      return '/en/' + entry[0].localized[0].slug
    }
  },
  apollo: {
    mainmenu: gql`{
      mainmenu: globalSet(title: "mainmenu") {
        ... on mainmenu_GlobalSet {
          menuitems {
            title
            slug
            localized {
              title
              slug
            }
          }
          instagram
          facebook
        }
      }
    }`,
    entries: gql`{
      entries {
        id
        slug
        title
        localized {
          slug
          title
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
