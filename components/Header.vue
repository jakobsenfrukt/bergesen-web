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
          <li v-for="(item, index) in mainmenu.menuitems" :key="index">
            <NLink :to="`/en/${item.localized[0].slug}`">{{ item.localized[0].title }}</NLink>
          </li>
        </template>
        <template v-else>
          <li v-for="(item, index) in mainmenu.menuitems" :key="index">
            <NLink :to="`/${item.slug}`">{{ item.title }}</NLink>
          </li>
        </template>
        <li class="some">
          <a :href="mainmenu.facebook" target="_blank" class="some-link">
            <img src="/graphics/icons/fb.svg" alt="Facebook logo" class="some-icon" />
          </a>
        </li>
        <li class="some">
          <a :href="mainmenu.instagram" target="_blank" class="some-link">
            <img src="/graphics/icons/insta.svg" alt="Instagram logo" class="some-icon" />
          </a>
        </li>
      </ul>
    </nav>
    <nav class="translate">
      <template v-if="!english">
        <span>NO</span> / <span @click="switchLanguage()"><NLink :to="newSlug">EN</NLink></span>
      </template>
      <template v-if="english">
        <span @click="switchLanguage()"><NLink :to="newSlug">NO</NLink></span> / <span>EN</span>
      </template>
    </nav>
  </header>
</template>

<script>
import gql from 'graphql-tag'
export default {
  computed: {
    english() {
      return this.$store.state.english
    },
    currentSlug() {
      let currentPath = this.$route.path;
      if (currentPath.substring(0, 3) == "/en") {
        currentPath = currentPath.slice(4);
      } else {
        currentPath = currentPath.slice(1)
      }
      if (currentPath.substring(currentPath.length-1, currentPath.length) === "/") {
        currentPath = currentPath.substring(0, currentPath.length-1)
      }
      return currentPath
    },
    newSlug() {
      if (this.$route.path === "/") {
        return "/en/"
      } else if (this.$route.path.substring(0, 3) == "/en" && this.$route.path.length < 5) {
        return "/"
      }
      const entry = this.$store.state.entries.find(entry => entry.uri === this.currentSlug || entry.localized[0].uri === this.currentSlug);
      if (this.english) {
        return '/' + entry.uri
      }
      return '/en/' + entry.localized[0].uri
    }
  },
  methods: {
    switchLanguage() {
      this.$store.commit('setLanguage', !this.$store.state.english);
    }
  },
  mounted() {
    if (this.$route.path.substring(0, 3) === "/en") {
      this.$store.commit('setLanguage', true);
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
    }`
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: $sans-serif;
}
.logo-svg {
  width: 6.6rem;
  margin-right: 1rem;
}
.site-nav {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
      margin: 0 1rem .5rem;
      vertical-align: middle;

      &.some {
        margin: 0 .24rem .5rem;
      }
    }
  }
  a {
    color: inherit;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: .01em;
    font-size: 1rem;


    &:hover {
      opacity: .5;
    }
  }
}
.some {
  &-icon {
    width: 1rem;
    height: 1rem;
    vertical-align: middle;
  }
}
.translate {
  display: inline-block;
}
</style>
