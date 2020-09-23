<template>
  <main class="site-main">
    <PageHeader :heading="entry.title" :lead="entry.lead" />
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
