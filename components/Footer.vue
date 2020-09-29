<template>
  <footer>
    <div class="contact">
      <h2>Kontakt oss</h2>
      <div class="email">
        <div v-for="(email, index) in contact.email" :key="index" class="email-block">
          <strong>{{ email.label }}</strong>
          <a :href="`mailto:${email.address}`" target="_blank">{{ email.address }}</a>
        </div>
      </div>
      <div>
        <strong>Telefon</strong>
        {{ contact.phone }}
      </div>
    </div>
    <div class="address">
      <h2>&nbsp;</h2>
      <div class="address-visitor">
        <strong>Besøksadresse</strong>
        <pre>{{ contact.addressVisitor }}</pre>
        <a href="https://goo.gl/maps/j6osNkyAc3Esf5gx8" target="_blank">Se i kart</a>
      </div>
      <div class="address-postal">
        <strong>Postadresse</strong>
        <pre>{{ contact.addressPostal }}</pre>
      </div>
    </div>
    <div>
      <h2>&nbsp;</h2>
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

  h2 {
    font-family: $serif;
  }

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

  .address {
    &-visitor,
    &-postal {
      margin-bottom: 1rem;
    }
  }

  pre {
    font-family: inherit;
    margin: 0;
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
