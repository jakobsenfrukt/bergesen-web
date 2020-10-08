<template>
  <header>
    <div class="logo">
      <NLink :to="english ? '/en/' : '/'">
        <img src="/logo.svg" class="logo-svg" alt="Bergesenstiftelsen logo" />
      </NLink>
    </div>
    <div class="menu-toggle" @click="open = !open" :class="{ open: open }">
      <span v-if="open">&times;</span>
      <span v-else>&#9776;</span>
    </div>
    <nav v-if="mainmenu" class="site-nav" :class="{ open: open }">
      <ul class="main-nav">
        <template v-if="english">
          <li v-for="(item, index) in menu" :key="index" @click="open = false" :class="item.slug">
            <NLink :to="`/${item.localized[0].uri}`">{{ item.localized[0].title }}</NLink>
          </li>
        </template>
        <template v-else>
          <li v-for="(item, index) in menu" :key="index" @click="open = false"  :class="item.slug">
            <NLink :to="`/${item.uri}`">{{ item.title }}</NLink>
          </li>
        </template>
      </ul>
      <div class="meta-nav">
        <div class="translate" @click="open = false">
          <template v-if="!english && newPath">
            <span>NO</span> /
            <span @click="switchLanguage()" class="link"><NLink :to="newPath">EN</NLink></span>
          </template>
          <template v-if="english && newPath">
            <span @click="switchLanguage()" class="link"><NLink :to="newPath">NO</NLink></span> /
            <span>EN</span>
          </template>
        </div>
        <a :href="mainmenu.facebook" target="_blank" class="some-icon">
          <Facebook />
        </a>
        <a :href="mainmenu.instagram" target="_blank" class="some-icon">
          <Instagram />
        </a>
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
    menu() {
      if (this.english) {
        return this.mainmenu.menuitems.filter(item => item.localized.length)
      }
      return this.mainmenu.menuitems
    },
    currentPath() {
      return this.$route.path.slice(1)
    },
    newPath() {
      if (this.$route.path === "/") {
        return "/en/"
      } else if (this.english && this.$route.path.length < 5) {
        return "/"
      }
      if (this.english) {
        const entry = this.$store.state.entries.find(entry => entry.localized.length && entry.localized[0].uri === this.currentPath)
        if (!entry) {
          return false
        }
        return '/' + entry.uri
      }
      const entry = this.$store.state.entries.find(entry => entry.uri === this.currentPath)
      if (!entry) {
        return false
      }
      if (entry.localized.length) {
        return '/' + entry.localized[0].uri
      }
      return false
    }
  },
  methods: {
    switchLanguage() {
      this.$store.commit('setLanguage', !this.$store.state.english);
    }
  },
  beforeMount() {
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
            uri
            localized {
              title
              slug
              uri
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
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
  align-items: center;
  font-family: $sans-serif;
}
.logo {
  width: 6rem;
  grid-column: 1 / span 2;
  margin-right: 1rem;
  a {
    display: block;
  }
  &-svg {
    width: 100%;
  }
}
.site-nav {
  grid-column: 3 / span 10;
  display: flex;
  align-items: center;
  flex: 1;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .main-nav {
    li {
      display: inline-block;
      margin: 0 1rem .5rem;
      vertical-align: middle;
      position: relative;
      line-height: 1.2;
    }
  }
  a {
    color: inherit;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: .016em;
  }
}
.some-icon {
  display: inline-block;
  vertical-align: middle;
  width: 1.2rem;
  height: 1.2rem;
  position: relative;
  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
}
.translate {
  display: inline-block;
  vertical-align: middle;
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
@media (min-width: 1400px) {
  .site-nav {
    ul {
      li {
        &.sok-stotte {
          margin: 0 1rem 0 4rem;
        }
      }
    }
  }
}
@media (min-width: $media-m) {
  .site-nav {
    .main-nav {
      li {
        margin: 0 1.8rem 0 0;
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
          color: $color-darkestgreen;
          font-weight: bold;
          &:after {
            background: $color-darkestgreen;
          }
        }
      }
    }
  }
  .meta-nav {
    position: absolute;
    top: 1rem;
    right: 2rem;
    display: flex;
    align-items: center;
  }
  .translate {
    margin-right: .6rem;
    line-height: 1;
  }
  .some-icon {
    margin-left: .5rem;
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
    padding: 7rem 2rem;
    background: $color-text;
    color: $color-background;
    font-size: 2.4rem;
    transform: translateX(100%);
    opacity: 0;
    transition: all .2s ease;

    .main-nav {
      display: flex;
      flex-direction: column;
      li {
        display: block;
        margin: .5rem 0 .75rem;
        &.sok-stotte {
          order: -1;
        }
      }

      a {
        display: block;
        &:hover {
          opacity: .5;
        }
      }
    }

    &.open {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .meta-nav {
    margin-top: 5rem;
  }
  .some-icon {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
  }
  .translate {
    display: block;
    margin-left: auto;
    order: 3;
  }
  .meta-nav {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
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
  .some-icon {
    width: 2.2rem;
    height: 2.2rem;
  }
}
</style>
