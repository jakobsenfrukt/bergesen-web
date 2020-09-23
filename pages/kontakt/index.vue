<template>
  <main class="site-main">
    <PageHeader :heading="entry.title" :lead="entry.lead" />
    <div class="contact">
      <div>
        <h2>TELEFON</h2>
        +47 21 03 05 00<br />
      </div>
      <div>
        <h2>FOR GENERELLE HENVENDELSER:</h2>
        <a href="mailto:post@bergesenstiftelsen.no" target="_blank">post@bergesenstiftelsen.no</a>
      </div>
      <div>
        <h2>FOR SØKNADER:</h2>
        <a href="mailto:soknad@bergesenstiftelsen.no" target="_blank">soknad@bergesenstiftelsen.no</a>
      </div>
    </div>
    <div class="address">
      <div class="address-text">
        <h2>BESØKSADRESSE</h2>
        Villa Bergehus, Frøyas gate 15<br />
        0273 Oslo<br />
        <br />
        <h2>POSTADRESSE</h2>
        Postboks 366 Skøyen<br />
        0213 Oslo<br />
      </div>
      <div class="address-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1999.926715618733!2d10.6913284160961!3d59.91676358186823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416dcb35f01549%3A0x1e04e8f4336a18e6!2sFr%C3%B8yas%20gate%2015%2C%200273%20Oslo!5e0!3m2!1sen!2sno!4v1600883898718!5m2!1sen!2sno" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
      </div>
    </div>
    Organisasjonsnummer: 943 026 165<br />
    <div v-html="entry.body" class="page-body"></div>
    <div style="max-width: 42rem; margin: 0 auto">
      <Button href="#" text="Last ned søknadsskjema" />

      <div class="featured featured-info">
        <p>Hvis du har noen spørsmål knyttet til søknadsskjemaet, ta gjerne kontakt med oss på <a href="mailto:post@bergesenstiftelsen.no" target="_blank">post@bergesenstiftelsen.no</a> eller per telefon <strong>+47 21 03 05 00</strong>.</p>
      </div>
      <div class="featured featured-warning">
        <p>Hvis du har noen spørsmål knyttet til søknadsskjemaet, ta gjerne kontakt med oss på <a href="mailto:post@bergesenstiftelsen.no" target="_blank">post@bergesenstiftelsen.no</a> eller per telefon <strong>+47 21 03 05 00</strong>.</p>
      </div>
      <div class="featured featured-warning-option">
        <p>Hvis du har noen spørsmål knyttet til søknadsskjemaet, ta gjerne kontakt med oss på <a href="mailto:post@bergesenstiftelsen.no" target="_blank">post@bergesenstiftelsen.no</a> eller per telefon <strong>+47 21 03 05 00</strong>.</p>
      </div>

      <div class="featured featured-info">
        <p><strong>Kjenner du til en verdig mottaker av Bergesenprisen?</strong><br />Offentligheten inviteres til å nominere mulige prismottakere i en åpen nominasjonsrunde ved årets begynnelse. Styret i Bergesenstiftelsen beslutter prismottaker. Prisen kan ved styrets beslutning deles mellom flere personer/institusjoner.</p>
        <Button href="#" text="Nominér en kandidat" />
      </div>
      <div class="featured featured-warning">
        <p><strong>Kjenner du til en verdig mottaker av Bergesenprisen?</strong><br />Offentligheten inviteres til å nominere mulige prismottakere i en åpen nominasjonsrunde ved årets begynnelse. Styret i Bergesenstiftelsen beslutter prismottaker. Prisen kan ved styrets beslutning deles mellom flere personer/institusjoner.</p>
        <Button href="#" text="Nominér en kandidat" />
      </div>
      <div class="featured featured-warning-option">
        <p><strong>Kjenner du til en verdig mottaker av Bergesenprisen?</strong><br />Offentligheten inviteres til å nominere mulige prismottakere i en åpen nominasjonsrunde ved årets begynnelse. Styret i Bergesenstiftelsen beslutter prismottaker. Prisen kan ved styrets beslutning deles mellom flere personer/institusjoner.</p>
        <Button href="#" text="Nominér en kandidat" />
      </div>
      <h2>Kjenner du til en verdig mottaker av Bergesenprisen?</h2>
      <p>Offentligheten inviteres til å nominere mulige prismottakere i en åpen nominasjonsrunde ved årets begynnelse. Styret i Bergesenstiftelsen beslutter prismottaker. Prisen kan ved styrets beslutning deles mellom flere personer/institusjoner.</p>
        <Button href="#" text="Nominér en kandidat" />

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt diam nunc, vel facilisis est gravida nec. In dignissim, ligula vitae sollicitudin lobortis, neque libero fermentum augue, vel commodo elit leo sit amet elit. Etiam in porttitor nisi, elementum aliquet magna. Donec et ipsum pretium, ultrices arcu vel, malesuada nisl.</p>
    </div>
    <PersonList v-if="people" :people="admin" heading="Kontakt administrasjonen" />
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
    margin-bottom: .5rem;
    font-size: 1.4rem;
  }
}
.contact {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  max-width: 54rem;
  margin: 1rem auto $spacing-m;
  padding: 2rem;
}
.address {
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  max-width: 54rem;
  margin: 1rem auto $spacing-m;

  &-text {
    background: $color-lightestgray;
    padding: 2rem 2rem $spacing-l;
  }

  &-map {
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
.featured {
  background: $color-lightestgreen;
  padding: 2rem 2.6rem 2.4rem;
  margin: 1rem auto $spacing-m;
  font-family: $serif-fine;
  font-size: 1.4rem;
  a {
    color: inherit;
    font-family: $sans-serif;
    font-weight: 700;
    text-decoration: underline;
    transition: color .3s ease;
    &:hover {
      color: $color-green;
    }
    &.button {
      font-family: $serif;
      font-weight: 400;
      text-decoration: none;
      margin-bottom: 0;
      &:hover {
        color: inherit;
      }
    }
  }
  p {
    margin: 0;
  }

  &-info {
    background: $color-lightestgreen;
  }
  &-warning {
    background: $color-lightestred;
    font-family: $sans-serif;
    font-weight: 400;
    a {
      &:hover {
        color: $color-red;
      }
      &.button {
        background: $color-white;
        color: $color-red;
        &:hover {
          color: $color-red;
        }
      }
    }
  }
  &-warning-option {
    background: $color-lightestgray;
    a {
      &:hover {
        color: $color-red;
      }
    }
  }
}
</style>
