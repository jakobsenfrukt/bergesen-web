<template>
  <main class="site-main">
    <PageHeader :heading="entry.title" :lead="entry.lead" />
    <div v-html="entry.body" class="page-body"></div>
    <div style="max-width: 42rem; margin: 0 auto">
      <Button href="#" text="Last ned søknadsskjema" />
      <div class="featured featured-info">
        Hvis du har noen spørsmål knyttet til søknadsskjemaet, ta gjerne kontakt med oss på <a href="mailto:post@bergesenstiftelsen.no" target="_blank">post@bergesenstiftelsen.no</a> eller per telefon <strong>+47 21 03 05 00</strong>.
      </div>
      <div class="featured featured-warning">
        Hvis du har noen spørsmål knyttet til søknadsskjemaet, ta gjerne kontakt med oss på <a href="mailto:post@bergesenstiftelsen.no" target="_blank">post@bergesenstiftelsen.no</a> eller per telefon <strong>+47 21 03 05 00</strong>.
      </div>
      <div class="featured featured-warning-option">
        Hvis du har noen spørsmål knyttet til søknadsskjemaet, ta gjerne kontakt med oss på <a href="mailto:post@bergesenstiftelsen.no" target="_blank">post@bergesenstiftelsen.no</a> eller per telefon <strong>+47 21 03 05 00</strong>.
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
  apollo: {
    entry: gql`{
      entry(type: "contact", site: "default") {
        ... on contact_contact_Entry {
          title
          lead
          body
        }
      }
    }`,
    people: {
      query: gql`{
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
    }
  },
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
