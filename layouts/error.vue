<template>
  <main>
    <h1 v-if="error.statusCode === 404">{{ english ? notfound.en : notfound.no }}</h1>
    <h1 v-else>{{ english ? errormessage.en : errormessage.no }}</h1>
  </main>
</template>

<script>
  export default {
    props: ['error'],
    data() {
      return {
        notfound: {
          en: "Page not found",
          no: "Finner ikke siden"
        },
        errormessage: {
          en: "An error occurred",
          no: "Det skjedde en feil"
        }
      }
    },
    computed: {
      english() {
        return this.$store.state.english
      }
    }
  }
</script>
