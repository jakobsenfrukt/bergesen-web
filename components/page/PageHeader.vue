<template>
  <div>
    <h1 class="page-title">{{ heading }}</h1>
    <Date v-if="date" :rawDate="date" />
    <p v-if="lead" class="lead">
      {{ lead }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    heading: String,
    lead: String,
    date: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.page-title {
  font-size: 2.8rem;
}
.lead {
  font-size: 1.4rem;
  margin-bottom: $spacing-m;
}
@media (max-width: $media-s) {
  .page-title {
    font-size: 2rem;
  }
  .lead {
    font-size: 1.2rem;
    line-height: 1.4;
  }
}
</style>
