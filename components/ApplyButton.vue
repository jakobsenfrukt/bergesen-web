<template>
  <Button :href="t.applicationPortal.urlFull" :text="t.applicationPortal.buttonText" target="_blank" />
</template>

<script>
import gql from 'graphql-tag'
import Button from '@/components/Button.vue'

export default {
  components: {
    Button
  },
  data() {
    return {
      no: {
        applicationPortal: {}
      },
      en: {
        applicationPortal: {}
      }
    }
  },
  computed: {
    english() {
      return this.$store.state.english
    },
    t() {
      if (this.english) {
        return this.en
      }
      return this.no
    }
  },
  apollo: {
    applicationPortal: {
      query: gql`query {
        applicationPortal: globalSet(id: "5066", site: "default") {
          ... on applicationPortal_GlobalSet {
            urlFull
            buttonText
            linkText
          }
        }
        applicationPortalEn: globalSet(id: "5066", site: "bergesenstiftelsenEn") {
          ... on applicationPortal_GlobalSet {
            urlFull
            buttonText
            linkText
          }
        }
      }`,
      result ({ data, loading }) {
        if (!loading) {
          this.no.applicationPortal = data.applicationPortal
          this.en.applicationPortal = data.applicationPortalEn
        }
      }
    }
  }
}
</script>


<style lang="scss">
@import '@/assets/css/variables.scss';
.button {
  display: inline-block;
  min-width: 51%;
  max-width: 32rem;
  margin: 1rem auto $spacing-m;
  background: $color-lightgreen;
  padding: 1rem 6rem 1rem 2rem;
  padding-left: 2rem;
  color: $color-blue;
  text-decoration: none;
  border-radius: 2em;
  position: relative;
  font-size: 1.4rem;
  font-weight: 400;
  transition: all .3s ease;
  font-family: $sans-serif;
  cursor: pointer;

  &.secondary {
    background: $color-lightgreen;
  }

  &:before {
    content: "→";
    display: block;
    font-family: $sans-serif;
    position: absolute;
    left: 2rem;
    opacity: 0;
    transform: translateX(-100%);
    transition: all .3s ease;
  }
  &:hover {
    padding: 1rem 4rem 1rem 4rem;
    &:before {
      opacity: 1;
      transform: translateX(0);
    }
  }

  + .button {
    margin-top: -$spacing-m;
  }
}
@media (max-width: $media-s) {
  .button {
    font-size: 1.2rem;
  }
}
</style>
