<template>
  <footer>
    <div class="logo">
      <NLink :to="english ? '/en/' : '/'">
        <img src="/graphics/logo-w.svg" class="logo-svg" alt="Bergesenstiftelsen logo" />
      </NLink>
    </div>
    <div class="contact">
      <h2>Kontakt oss</h2>
      <div class="email">
        <div v-for="(email, index) in contact.email" :key="index" class="email-block">
          {{ email.label }}
          <a :href="`mailto:${email.address}`" target="_blank">{{ email.address }}</a>
        </div>
      </div>
      <div class="phone">
        Telefon
        <strong>{{ contact.phone }}</strong>
      </div>
    </div>
    <div class="address">
      <h2>&nbsp;</h2>
      <div class="address-visitor">
        Besøksadresse
        <pre>{{ contact.addressVisitor }}</pre>
        <a href="https://goo.gl/maps/j6osNkyAc3Esf5gx8" target="_blank">Se i kart</a>
      </div>
      <div class="address-postal">
        Postadresse
        <pre>{{ contact.addressPostal }}</pre>
      </div>
    </div>
    <div class="newsletter-wrapper">
      <h2>Nyhetsbrev</h2>
      <Newsletter />
    </div>
    <div class="mf-logo-wrapper">
      <img src="/graphics/mf-logo.svg" class="mf-logo" alt="Miljøfyrtårn logo" />
    </div>
    <div class="meta">
      Organisasjonsnummer:
      <strong>{{ contact.orgNumber }}</strong><br />
      <NLink to="/cookies">Personvern og cookies</NLink>
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
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
  align-items: flex-start;
  min-height: 24rem;
  width: 100%;
  font-family: $sans-serif;
  font-weight: 700;
  position: relative;

  .logo {
    grid-column: 1 / span 2;
    img {
      width: 6rem;
    }
  }

  h2 {
    font-family: $serif-fine;
    font-size: 1.8rem;
  }

  strong, a, pre {
    display: block;
    font-family: $sans-serif;
    font-weight: 500;
    color: inherit;
  }

  a {
    transition: all .3s ease;
    &:hover {
      color: $color-green;
    }
  }

  .contact {
    grid-column: 3 / span 3;
  }
  .email {
    &-block {
      margin-bottom: 1.5rem;
    }
  }

  .address {
    grid-column: 6 / span 3;
    &-visitor,
    &-postal {
      margin-bottom: 1.5rem;
    }
  }

  pre {
    margin: 0;
  }

  .meta {
    grid-column: 3 / span 6;
    width: 100%;
    opacity: .6;
    margin-top: 6rem;
    font-weight: 500;

    strong, a {
      display: inline-block;
      font-weight: 500;
    }
    strong {
      &:after {
        content: "|";
        display: inline-block;
        margin: 0 1rem;
      }
    }
    br {
      display: none;
    }
  }

  .newsletter-wrapper {
    grid-column: 10 / span 3;
  }
}
.mf-logo-wrapper {
  text-align: right;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 2;
}
.mf-logo {
  width: 5.2rem;
}
@media (max-width: $media-m) {
  footer {
    .logo {
      grid-column: 1 / span 2;
    }
    .logo, .contact, .address {
      margin-bottom: 2rem;
    }
    .contact {
      grid-column: 3 / span 4;
    }
    .address {
      grid-column: 7 / span 4;
    }
    .newsletter-wrapper {
      grid-column: 3 / span 6;
      margin-top: 2rem;
    }
    .meta {
      grid-column: 3 / span 6;
      strong:after {
        display: none;
      }
      br {
        display: block;
      }
    }
  }
}
@media (max-width: $media-s) {
  footer {
    padding: 2rem;
    .logo {
      grid-column: 1 / span 3;
    }
    .contact {
      grid-column: 1 / span 12;
    }
    .address {
      grid-column: 1 / span 12;
    }
    .newsletter-wrapper {
      grid-column: 1 / span 10;
      margin-top: 2rem;
    }
    .meta {
      grid-column: 1 / span 8;
    }
    .mf-logo-wrapper {
      bottom: 1rem;
      right: 1rem;
    }
  }
}
</style>
