import fetch from 'node-fetch';
import getApolloConfig from './apollo.config'
import { execute, makePromise } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import gql from 'graphql-tag'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /* Global CSS */
  css: [
    '@/assets/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/apollo',
  ],
  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: '@/apollo.config.js'
    }
  },
  generate: {
    routes: function () {
      const config = getApolloConfig()
      const uri = config.httpEndpoint
      const httpLink = createHttpLink({
        uri: uri,
        fetch: fetch,
        cache: config.cache,
      });

      const operation = {
        query: gql`
        query {
          news: entries(section: "newsArticles" ) {
            slug
            localized {
              slug
            }
          }
          about: entries(section: "aboutPages") {
            slug
            localized {
              slug
            }
          }
          apply: entries(section: "applyPages") {
            slug
            localized {
              slug
            }
          }
        }`
      }
      return makePromise(execute(httpLink, operation))
      .then(result => {
        var newsArray = result.data.news.map(news => `/aktuelt/${news.slug}/`)
        var aboutArray = result.data.about.map(about => `/om/${about.slug}/`)
        var applyArray = result.data.apply.map(apply => `/sok-stotte/${apply.slug}/`)
        var newsArrayEn = result.data.news.map(news => `/en/news/${news.localized[0].slug}/`)
        var aboutArrayEn = result.data.about.map(about => `/en/about/${about.localized[0].slug}/`)
        var applyArrayEn = result.data.apply.map(apply => `/en/apply/${apply.localized[0].slug}/`)
        return newsArray.concat(newsArrayEn, aboutArray, aboutArrayEn, applyArray, applyArrayEn)
      })
      .catch(error => console.log(`received error ${error}`))
    }
  },
  server: {
    host: '0.0.0.0'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
