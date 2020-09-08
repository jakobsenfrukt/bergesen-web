<template>
  <header>
    <div class="logo">(logo)</div>
    <nav class="site-nav">
      <ul v-if="english">
        <li v-for="(item, index) in menuItemsEn" :key="index">
          <NLink :to="`/en/${item.slug}`">{{ item.title }}</NLink>
        </li>
      </ul>
      <ul v-else>
        <li v-for="(item, index) in menuItems" :key="index">
          <NLink :to="`/${item.slug}`">{{ item.title }}</NLink>
        </li>
      </ul>
    </nav>
    <nav class="translate">
      <NLink :to="languageLink">{{ language }}</NLink>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    english: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      menuItems: [
        {
          title: 'Hjem',
          slug: ''
        },
        {
          title: 'Tildelinger',
          slug: 'tildelinger'
        },
        {
          title: 'Aktuelt',
          slug: 'aktuelt'
        },
        {
          title: 'Bergesenprisen',
          slug: 'bergesenprisen'
        },
        {
          title: 'Kontakt',
          slug: 'kontakt'
        },
        {
          title: 'Om stiftelsen',
          slug: 'om'
        },
        {
          title: 'Søk støtte',
          slug: 'sok-stotte'
        }
      ],
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
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
