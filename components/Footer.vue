<template>
  <footer>
    <div class="logo">
      <NLink :to="english ? '/en/' : '/'">
        <img
          src="/graphics/logo-w.svg"
          class="logo-svg"
          alt="Bergesenstiftelsen logo"
        />
      </NLink>
    </div>
    <div class="contact">
      <h2>{{ t.contact }}</h2>
      <div class="email">
        <div
          v-for="(email, index) in contact.email"
          :key="index"
          class="email-block"
        >
          {{ email.label }}
          <a :href="`mailto:${email.address}`" target="_blank">{{
            email.address
          }}</a>
        </div>
        <div class="email-block">
          {{ t.applicationLabel }}
          <a :href="t.applicationPortal.urlFull" target="_blank">{{
            t.applicationPortal.linkText
          }}</a>
        </div>
      </div>
      <div class="phone">
        <div
          v-for="(phone, index) in contact.phone"
          :key="index"
          class="phone-block"
        >
          {{ t.phone }}
          <a :href="`tel:${phone.number}`">{{ phone.number }}</a>
          <pre>{{ phone.time }}</pre>
        </div>
      </div>
    </div>
    <div class="address">
      <h2>&nbsp;</h2>
      <div class="address-visitor">
        {{ t.addressVisitor }}
        <pre>{{ contact.addressVisitor }}</pre>
        <a href="https://goo.gl/maps/j6osNkyAc3Esf5gx8" target="_blank">{{
          t.map
        }}</a>
      </div>
      <div class="address-postal">
        {{ t.addressPostal }}
        <pre>{{ contact.addressPostal }}</pre>
      </div>
    </div>
    <div class="mf-logo-wrapper">
      <a href="https://www.miljofyrtarn.no/" target="_blank" class="mf-logo">
        <img src="/graphics/mf-logo.svg" alt="Miljøfyrtårn logo" />
      </a>
    </div>
    <div class="meta">
      {{ t.orgNr }}: <strong>{{ contact.orgNumber }}</strong
      ><br />
      <NLink :to="`${english ? '/en/cookies' : '/cookies'}`" class="cookies">{{
        t.cookies
      }}</NLink
      ><br />
      <div class="credit">
        {{ t.credit }}:
        <a href="https://bransjen.no" target="_blank">Bransjen</a> +
        <a href="https://jakobsenfrukt.no" target="_blank">JF&amp;G</a>
      </div>
    </div>
  </footer>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      no: {
        newsletter: "Få informasjon",
        contact: "Kontakt oss",
        phone: "Telefon",
        addressVisitor: "Besøksadresse",
        addressPostal: "Postadresse",
        map: "Se i kart",
        orgNr: "Organisasjonsnummer",
        cookies: "Personvern og cookies",
        credit: "Design og nettside",
        applicationLabel: "For søknader",
        applicationPortal: {}
      },
      en: {
        newsletter: "Stay updated",
        contact: "Contact us",
        phone: "Phone",
        addressVisitor: "Visitor address",
        addressPostal: "Postal address",
        map: "View on map",
        orgNr: "Organisation number",
        cookies: "Privacy and cookies",
        credit: "Design and website",
        applicationLabel: "For applications",
        applicationPortal: {}
      }
    };
  },
  computed: {
    english() {
      return this.$store.state.english;
    },
    contact() {
      if (this.english) {
        const entry = this.$store.state.entries.find(
          entry => entry.slug === "kontakt"
        );
        return entry.localized[0];
      }
      return this.$store.state.entries.find(entry => entry.slug === "kontakt");
    },
    t() {
      if (this.english) {
        return this.en;
      }
      return this.no;
    }
  },
  apollo: {
    applicationPortal: {
      query: gql`
        query {
          applicationPortal: globalSet(id: "5066", site: "default") {
            ... on applicationPortal_GlobalSet {
              urlFull
              buttonText
              linkText
            }
          }
          applicationPortalEn: globalSet(
            id: "5066"
            site: "bergesenstiftelsenEn"
          ) {
            ... on applicationPortal_GlobalSet {
              urlFull
              buttonText
              linkText
            }
          }
        }
      `,
      result({ data, loading }) {
        if (!loading) {
          this.no.applicationPortal = data.applicationPortal;
          this.en.applicationPortal = data.applicationPortalEn;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
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
  z-index: 10;

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

  strong,
  a,
  pre {
    display: block;
    font-family: $sans-serif;
    font-weight: 500;
    color: inherit;
  }

  a {
    transition: all 0.3s ease;
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
    grid-column: 3 / span 8;
    width: 100%;
    opacity: 0.6;
    margin-top: 6rem;
    font-weight: 500;

    strong,
    a,
    .credit {
      display: inline-block;
      font-weight: 500;
    }
    strong,
    .cookies {
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
@media (max-width: 1352px) {
  footer {
    .meta {
      .cookies:after {
        display: none;
      }
      br:last-of-type {
        display: block;
      }
    }
  }
}
@media (max-width: $media-m) {
  footer {
    .logo {
      grid-column: 1 / span 2;
    }
    .logo,
    .contact,
    .address {
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
      bottom: 1.5rem;
    }
  }
}
</style>
