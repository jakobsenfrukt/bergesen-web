import fetch from 'node-fetch';
import getApolloConfig from './apollo.config'
import { execute, makePromise } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import gql from 'graphql-tag'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/guides/configuration-glossary/configuration-ssr
  */
  ssr: true,
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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'format-detection', content: 'telephone=no' }
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
    ['@nuxtjs/google-analytics', {
      id: 'UA-179785209-1'
    }]
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
    fallback: true,
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
          default: entries(site: "default" ) {
            uri
          }
          english: entries(site: "bergesenstiftelsenEn" ) {
            uri
          }
        }`
      }
      return makePromise(execute(httpLink, operation))
      .then(result => {
        var defaultPages = result.data.default.map(page => `/${page.uri}`)
        var englishPages = result.data.english.map(page => `/${page.uri}`)
        return defaultPages.concat(englishPages)
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
