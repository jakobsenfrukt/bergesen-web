<template>
  <footer>
    <div class="contact">
      <h2>Kontakt oss</h2>
      <div class="email">
        <div v-for="(email, index) in contact.email" :key="index" class="email-block">
          {{ email.label }}
          <a :href="`mailto:${email.address}`" target="_blank">{{ email.address }}</a>
        </div>
      </div>
    </div>
    <div class="phone">
      <h2>&nbsp;</h2>
      Telefon
      <strong>{{ contact.phone }}</strong>
    </div>
    <div class="address">
      <h2>&nbsp;</h2>
      Besøksadresse
      <pre>{{ contact.addressVisitor }}</pre>
      <a href="https://goo.gl/maps/j6osNkyAc3Esf5gx8" target="_blank">Se i kart</a>
    </div>
    <div class="address-postal">
      <h2>&nbsp;</h2>
      Postadresse
      <pre>{{ contact.addressPostal }}</pre>
    </div>
    <div class="mf-logo-wrapper">
      <img src="/graphics/mf-logo.svg" class="mf-logo" alt="Miljøfyrtårn logo" />
    </div>
    <div class="meta">
      Organisasjonsnummer:
      <strong>{{ contact.orgNumber }}</strong> &nbsp;
      | &nbsp; <NLink to="/cookies">Personvern og cookies</NLink>
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
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 2rem;
  align-items: flex-start;
  min-height: 24rem;
  width: 100%;
  font-family: $sans-serif;
  font-weight: 700;
  position: relative;

  h2 {
    font-family: $serif-fine;
  }

  strong, a, pre {
    display: block;
    font-family: $sans-serif;
    font-weight: 500;
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
    margin: 0;
  }

  .meta {
    grid-column: 1 / span 4;
    width: 100%;
    text-align: center;
    opacity: .5;
    margin-top: $spacing-l;
    font-weight: 500;

    strong, a {
      display: inline-block;
      font-weight: 500;
    }
  }
}
.mf-logo-wrapper {
  text-align: right;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 2;
}
@media (max-width: $media-m) {
  footer {
    grid-template-columns: repeat(2, 1fr);
    .meta {
      grid-column: 1 / span 2;
      margin-top: 0;
    }
  }
  .mf-logo-wrapper {
    position: static;
    grid-column: 1 / span 2;
    text-align: center;
    margin: $spacing-l auto $spacing-m;
  }
}
@media (max-width: $media-s) {
  footer {
    grid-template-columns: 1fr;
    .meta {
      grid-column: 1 / span 1;
      margin-top: 0;
    }
  }
  .mf-logo-wrapper {
    position: static;
    grid-column: 1 / span 1;
    text-align: center;
    margin: $spacing-l auto $spacing-m;
  }
}
</style>
