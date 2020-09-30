<template>
  <div class="faq">
    <ul class="faq-list">
      <FaqItem v-for="(faq, index) in faq" :key="index" :faq="faq" />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    faq: Array
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.faq-list {
  width: 100%;
  list-style: none;
  margin: 0 auto $spacing-l;
}
</style>
