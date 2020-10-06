<template>
  <main class="site-main">
    <PageHeader :heading="entry.title" :lead="entry.lead" />
    <div v-html="entry.body" class="page-body"></div>
    <div class="page-body">
      <Button href="#" text="Last ned søknadsskjema" secondary />

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
        <p><strong>Kjenner du til en verdig mottaker av Bergesenprisen?</strong>Offentligheten inviteres til å nominere mulige prismottakere i en åpen nominasjonsrunde ved årets begynnelse. Styret i Bergesenstiftelsen beslutter prismottaker. Prisen kan ved styrets beslutning deles mellom flere personer/institusjoner.</p>
        <Button href="#" text="Nominér en kandidat" />
      </div>
      <div class="featured featured-warning">
        <p><strong>Kjenner du til en verdig mottaker av Bergesenprisen?</strong>Offentligheten inviteres til å nominere mulige prismottakere i en åpen nominasjonsrunde ved årets begynnelse. Styret i Bergesenstiftelsen beslutter prismottaker. Prisen kan ved styrets beslutning deles mellom flere personer/institusjoner.</p>
        <Button href="#" text="Nominér en kandidat" />
      </div>
      <div class="featured featured-warning-option">
        <p><strong>Kjenner du til en verdig mottaker av Bergesenprisen?</strong>Offentligheten inviteres til å nominere mulige prismottakere i en åpen nominasjonsrunde ved årets begynnelse. Styret i Bergesenstiftelsen beslutter prismottaker. Prisen kan ved styrets beslutning deles mellom flere personer/institusjoner.</p>
        <Button href="#" text="Nominér en kandidat" />
      </div>
      <h2>Kjenner du til en verdig mottaker av Bergesenprisen?</h2>
      <p>Offentligheten inviteres til å nominere mulige prismottakere i en åpen nominasjonsrunde ved årets begynnelse. Styret i Bergesenstiftelsen beslutter prismottaker. Prisen kan ved styrets beslutning deles mellom flere personer/institusjoner.</p>
        <Button href="#" text="Nominér en kandidat" secondary />

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt diam nunc, vel facilisis est gravida nec. In dignissim, ligula vitae sollicitudin lobortis, neque libero fermentum augue, vel commodo elit leo sit amet elit. Etiam in porttitor nisi, elementum aliquet magna. Donec et ipsum pretium, ultrices arcu vel, malesuada nisl.</p>
    </div>
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
  async asyncData({ app, route }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`{
        entry(type: "cookies", site: "default") {
          ... on cookies_cookies_Entry {
            title
            lead
            body
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
