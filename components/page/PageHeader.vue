<template>
  <div class="page-header">
    <h1 class="page-title">{{ heading }}</h1>
    <p v-if="lead" class="lead">
      {{ lead }}
    </p>
    <Date v-if="date" short :rawDate="date" />
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
.page-header {
  margin-bottom: $spacing-m;
}
.page-title {
  font-size: 2.8rem;
}
.lead {
  font-size: 1.4rem;
  max-width: 42rem;
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
