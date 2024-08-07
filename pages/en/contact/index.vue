<template>
  <main class="site-main contact-page">
    <BackgroundShape page="contact" />
    <PageHeaderSimple :heading="entry.title" :lead="entry.lead" />
    <div class="page-body contact">
      <div class="contact-info">
        <div class="email">
          <div
            v-for="(email, index) in entry.email"
            :key="index"
            class="email-block"
          >
            <h3>{{ email.label }}</h3>
            <a :href="`mailto:${email.address}`" target="_blank">{{
              email.address
            }}</a>
          </div>
          <div class="email-block">
            <h3>For applications</h3>
            <a :href="applicationPortal.urlFull" target="_blank">{{
              applicationPortal.linkText
            }}</a>
          </div>
        </div>
        <div class="phone">
          <div
            v-for="(phone, index) in entry.phone"
            :key="index"
            class="phone-block"
          >
            <h3>Phone</h3>
            <a :href="`tel:${phone.number}`">{{ phone.number }}</a>
            <p>{{ phone.time }}</p>
          </div>
        </div>
      </div>
    </div>
    <PersonList
      v-if="people"
      :people="admin"
      heading="Administration"
      class="people"
      contactpage
    />
    <div
      v-if="entry.body"
      v-html="entry.body"
      class="page-body downloads"
    ></div>
    <div class="address">
      <div class="address-text">
        <h2>Visitor address</h2>
        <pre>{{ entry.addressVisitor }}</pre>
        <h2>Postal address</h2>
        <pre>{{ entry.addressPostal }}</pre>
      </div>
      <div class="address-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1999.926715618733!2d10.6913284160961!3d59.91676358186823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416dcb35f01549%3A0x1e04e8f4336a18e6!2sFr%C3%B8yas%20gate%2015%2C%200273%20Oslo!5e0!3m2!1sen!2sno!4v1600883898718!5m2!1sen!2sno"
          width="600"
          height="450"
          frameborder="0"
          style="border:0;"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
    </div>
  </main>
</template>

<script>
import gql from "graphql-tag";
export default {
  data: function() {
    return {
      entry: {}
    };
  },
  computed: {
    admin() {
      if (!this.people) {
        return;
      }
      return this.people.people.filter(person => person.group === "admin");
    }
  },
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`
        {
          entry(type: "contact", site: "bergesenstiftelsenEn") {
            ... on contact_contact_Entry {
              title
              lead
              body
              email {
                ... on email_emailBlock_BlockType {
                  address
                  label
                }
              }
              addressPostal
              addressVisitor
              orgNumber
              phone {
                ... on phone_phoneItem_BlockType {
                  number
                  time
                }
              }
            }
          }
          people: entry(id: "295", site: "bergesenstiftelsenEn") {
            ... on aboutPages_people_Entry {
              people {
                ... on people_person_BlockType {
                  fullname
                  role
                  group
                  image {
                    url
                  }
                  phone
                  email
                }
              }
            }
          }
          applicationPortal: globalSet(
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
      `
    });
    return data;
  },
  fetchOnServer: true,
  head() {
    return {
      title: this.entry.title + " | Bergesenstiftelsen",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.entry.lead
        },
        {
          property: "og:image",
          content: "/ogimage.png"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.page-body.contact {
  grid-column: 1 / span 12;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
}
.contact-info,
.address {
  grid-column: 1 / span 12;
  font-family: $sans-serif;

  h2 {
    margin-bottom: 0.25rem;
    font-size: 1em;
    font-family: $sans-serif;
    font-weight: 700;
  }
}
.contact-info {
  grid-column: 3 / span 9;
  margin: 1rem 0 $spacing-s;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-column-gap: 2rem;

  h2 {
    margin: 0 0 0.5rem;
  }

  .email,
  .phone {
    margin-bottom: $spacing-s;
  }

  h3 {
    margin: 0;
    font-size: 1.2rem;
    font-family: $sans-serif;
  }

  .email {
    grid-column: 1 / span 6;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 2rem;
    &-block {
      grid-column: 1 / span 3;
      margin-bottom: 1.5rem;
      h3 {
        grid-column: 1 / span 6;
      }
      &:nth-of-type(even) {
        grid-column: 4 / span 3;
      }
    }
  }
  .phone {
    grid-column: 7 / span 2;
  }

  strong,
  a {
    font-weight: 700;
    color: inherit;
  }
  a {
    transition: color 0.3s ease;
    &:hover {
      color: $color-green;
    }
  }
}
.address {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
  margin: 1rem -2rem 0;

  &-text {
    grid-column: 1 / span 4;
    background: $color-lightgreen;
    padding: 2rem 2rem 7rem;
    margin-right: -2rem;
    pre {
      font-family: inherit;
      margin: 0 0 1.5rem;
    }
  }

  &-map {
    background: $color-lightestgray;
    grid-column: 5 / span 8;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
.people {
  grid-column: 3 / span 6;
  margin: 0;
}
.page-body.downloads {
  margin-top: 0;
}
.phone-block {
  p {
    margin-top: 0;
    font-weight: 400;
  }
}
@media (max-width: $media-m) {
  .contact-info {
    grid-column: 3 / span 8;
    display: block;

    .email {
      display: block;
    }
  }
}
@media (max-width: $media-s) {
  .contact-info {
    grid-column: 1 / span 12;
    display: block;

    .email {
      display: block;
    }
  }
  .address {
    &-text,
    &-map {
      grid-column: 1 / span 12;
    }
    &-text {
      padding-bottom: 2rem;
    }
  }
  .people {
    grid-column: 1 / span 12;
    margin-bottom: 0;
  }
}
</style>
