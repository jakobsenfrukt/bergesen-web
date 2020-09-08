<template>
  <div>
    <h1 class="page-title">{{ heading }}</h1>
    <p v-if="lead" class="lead">
      {{ lead }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    heading: String,
    lead: String
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  font-size: 2.8rem;
}
.lead {
  font-size: 1.4rem;
}
</style>
