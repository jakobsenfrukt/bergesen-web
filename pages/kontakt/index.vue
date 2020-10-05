<template>
  <main class="site-main">
    <PageHeader :heading="entry.title" :lead="entry.lead" />
    <div class="page-body">
      <div class="contact">
        <div class="email">
          <h2>E-post</h2>
          <div v-for="(email, index) in entry.email" :key="index" class="email-block">
            <h3>{{ email.label }}</h3>
            <a :href="`mailto:${email.address}`" target="_blank">{{ email.address }}</a>
          </div>
        </div>
        <div class="phone">
          <h2>Telefon</h2>
          <strong>{{ entry.phone }}</strong>
        </div>
      </div>
      <div class="address">
        <div class="address-text">
          <h2>Besøksadresse</h2>
          <pre>{{ entry.addressVisitor }}</pre>
          <h2>Postadresse</h2>
          <pre>{{ entry.addressPostal }}</pre>
        </div>
        <div class="address-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1999.926715618733!2d10.6913284160961!3d59.91676358186823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416dcb35f01549%3A0x1e04e8f4336a18e6!2sFr%C3%B8yas%20gate%2015%2C%200273%20Oslo!5e0!3m2!1sen!2sno!4v1600883898718!5m2!1sen!2sno" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
      </div>
    </div>
    <div v-if="entry.body" v-html="entry.body" class="page-body"></div>
    <PersonList v-if="people" :people="admin" heading="Administrasjon" class="people" contactpage />
  </main>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data: function() {
    return {
      entry: {}
    }
  },
  computed: {
    admin() {
      if (!this.people) {
        return
      }
      return this.people.people.filter(person => person.group === "admin");
    }
  },
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`{
        entry(type: "contact", site: "default") {
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
            phone
          }
        }
        people: entry(id: "295", site: "default") {
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
      }`
    })
    return data
  },
  fetchOnServer: true,
  head() {
    return {
      title: this.entry.title + ' | Bergesenstiftelsen',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.entry.lead
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.contact, .address {
  font-family: $sans-serif;

  h2 {
    margin-bottom: .25rem;
    font-size: 1em;
    font-family: $sans-serif;
    font-weight: 700;
  }
}
.contact {
  margin: 1rem auto $spacing-m;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;

  h2 {
    margin-bottom: .5rem;
  }

  .email,
  .phone {
    margin-bottom: $spacing-m;
    font-size: 1.2rem;
  }

  h3 {
    margin-bottom: 0;
    font-family: $sans-serif;
  }

  .email {
    &-block {
      margin-bottom: 1.5rem;
    }
  }

  strong, a {
    font-weight: 700;
    color: inherit;
  }
  a {
    transition: color .3s ease;
    &:hover {
      color: $color-green;
    }
  }
}
.address {
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  margin: 1rem auto $spacing-m;

  &-text {
    background: $color-lightestgray;
    padding: 2rem 2rem $spacing-l;
    pre {
      font-family: inherit;
      margin: 0 0 1.5rem;
    }
  }

  &-map {
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
.people {
  grid-column: 3 / span 7;
  margin: 0 0 2rem;
}
</style>
