<template>
  <footer>
    <div class="contact">
      <div class="email">
        <strong>E-POST</strong>
        <div v-for="(email, index) in contact.email" :key="index" class="email-block">
          <span>{{ email.label }}</span>
          <a :href="`mailto:${email.address}`">{{ email.address }}</a>
        </div>
      </div>
      <div>
        <strong>TELEFON</strong>
        {{ contact.phone }}
      </div>
    </div>
    <div class="address">
      <strong>Besøksadresse</strong>
      <pre>{{ contact.addressVisitor }}</pre>
      <strong>Postadresse</strong>
      <pre>{{ contact.addressPostal }}</pre>
    </div>
    <div>
      <div>
        Organisasjonsnummer:<br />
        {{ contact.orgNumber }}
      </div>
      <NLink to="/cookies">Personvern og cookies</NLink>
    </div>
    <div class="mf-logo-wrapper">
      <img src="/graphics/mf-logo.svg" class="mf-logo" />
    </div>
  </footer>
</template>

<script>
import gql from 'graphql-tag'
export default {
  computed: {
    english() {
      return this.$store.state.english
    },
    contact() {
      return this.$store.state.entries.find(entry => entry.slug === 'kontakt');
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
footer {
  background: $color-blue;
  color: $color-white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 2rem;
  align-items: flex-start;
  min-height: 24rem;
  width: 100%;
  font-family: $sans-serif;

  strong {
    display: block;
  }

  a {
    color: inherit;
  }

  .email {
    &-block {
      margin-bottom: 1rem;
    }
  }

  pre {
    font-family: inherit;
    margin: 0 0 1rem;
  }
}
.mf-logo-wrapper {
  text-align: right;
}
@media (max-width: $media-s) {
  footer {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
