<template>
  <footer>
    <div>
      <p>Kontaktinfo</p>
    </div>
    <div>
      <p>Adresse</p>
    </div>
    <div>
      <p>Organisasjonsnummer:<br />943 026 165</p>
      <p>Personvern</p>
    </div>
    <div>
      <img src="/graphics/mf-logo.svg" class="mf-logo" />
    </div>
  </footer>
</template>


<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
footer {
  background: $color-blue;
  color: $color-white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  min-height: 24rem;
  width: 100%;
}
</style>
