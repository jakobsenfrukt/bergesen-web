<template>
  <header>
    <div class="logo">
      <NLink :to="english ? '/en/' : '/'">
        <img src="/logo.svg" class="logo-svg" />
      </NLink>
    </div>
    <div class="menu-toggle" @click="open = !open" :class="{ open: open }">
      <span v-if="open">&times;</span>
      <span v-else>&#9776;</span>
    </div>
    <nav v-if="mainmenu" class="site-nav" :class="{ open: open }">
      <ul class="main-nav">
        <template v-if="english">
          <li v-for="(item, index) in mainmenu.menuitems" :key="index" @click="open = false" :class="item.slug">
            <NLink :to="`/en/${item.localized[0].slug}`">{{ item.localized[0].title }}</NLink>
          </li>
        </template>
        <template v-else>
          <li v-for="(item, index) in mainmenu.menuitems" :key="index" @click="open = false"  :class="item.slug">
            <NLink :to="`/${item.slug}`">{{ item.title }}</NLink>
          </li>
        </template>
      </ul>
      <ul class="some-nav">
        <li class="some fb">
          <a :href="mainmenu.facebook" target="_blank" class="some-link">
            <Facebook class="some-icon" />
          </a>
        </li>
        <li class="some insta">
          <a :href="mainmenu.instagram" target="_blank" class="some-link">
            <Instagram class="some-icon" />
          </a>
        </li>
      </ul>
      <div class="translate" @click="open = false">
        <template v-if="!english">
          <span>NO</span> / <span @click="switchLanguage()"><NLink :to="newSlug">EN</NLink></span>
        </template>
        <template v-if="english">
          <span @click="switchLanguage()"><NLink :to="newSlug">NO</NLink></span> / <span>EN</span>
        </template>
      </div>
    </nav>
  </header>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data() {
    return {
      open: false
    }
  },
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
  font-family: $sans-serif;
}
.logo-svg {
  width: 6.6rem;
  margin-right: 1rem;
}
.site-nav {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex: 1;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
      margin: 0 1rem .5rem;
      vertical-align: middle;
      position: relative;
      line-height: 1.2;

      &.some {
        margin: 0 .24rem .5rem;
      }
    }
  }
  a {
    color: inherit;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: .016em;
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

  a {
    text-decoration: underline;
  }
}
.menu-toggle {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 101;
  padding: 2rem;
  font-size: 3rem;
  cursor: pointer;

  display: none;
}
@media (min-width: $media-m) {
  .site-nav {
    ul {
      li {
        margin: 0 1rem;
        &:after {
          content: "";
          display: block;
          position: absolute;
          bottom: -.1em;
          left: 0;
          height: 2px;
          width: 0;
          background: $color-blue;
          transition: width .1s ease;
        }
        &:hover {
          &:after {
            width: 100%;
            transition: width .36s ease;
          }
        }
        &.sok-stotte {
          color: $color-darkgreen;
          margin: 0 1rem 0 2rem;
          &:after {
            background: $color-darkgreen;
          }
        }
        &.some {
          margin: 0 0 0 .5rem;
          &.fb {
            margin-left: auto;
          }
        }
      }
    }
  }
  .some-nav {
    width: 4rem;
  }
  .translate {
    position: absolute;
    top: 0;
    right: 2rem;
  }
}
@media (max-width: $media-m) {
  .logo-svg {
    width: 5.4rem;
  }
  .menu-toggle {
    display: block;
    transition: color .2s ease;

    &.open {
      color: $color-background;
    }
  }
  .site-nav {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 8rem 2rem;
    background: $color-text;
    color: $color-background;
    font-size: 2.4rem;
    transform: translateX(100%);
    opacity: 0;
    transition: all .2s ease;

    ul {

      li {
        display: block;
        margin: .5rem 0;

        &.some {
          display: inline-block;
          margin-top: 3rem;
        }
      }

      a {
        display: block;
      }
    }

    &.open {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .some {
    &-icon {
      width: 3rem;
      height: 3rem;
    }
  }
}
@media (max-width: $media-s) {
  .logo-svg {
    width: 4.2rem;
  }
  .menu-toggle {
    padding: 1rem 2rem;
  }
  .site-nav {
    font-size: 1.6rem;
  }
  .some {
    &-icon {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
