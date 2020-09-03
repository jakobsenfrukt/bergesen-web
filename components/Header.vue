<template>
  <header>
    <div class="logo">(logo)</div>
    <nav class="site-nav">
      <ul>
        <li v-for="(link, index) in menuLinks" :key="index">
          <NLink to="/">{{ link }}</NLink>
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
  data: function() {
    return {
      menuLinks: ['Hjem', 'Tildelinger', 'Aktuelt', 'Bergesenprisen', 'Kontakt', 'Om stiftelsen', 'Søk støtte' ]
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
  mounted() {
    console.log('slug: ' + this.$route.fullPath);
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
