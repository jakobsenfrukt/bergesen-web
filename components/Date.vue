<template>
  <span>{{ date }}</span>
</template>

<script>
export default {
  props: {
    rawDate: String,
    short: Boolean
  },
  computed: {
    date() {
      const dateObject = new Date(this.rawDate);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();
      if (this.short) {
        return month + "." + year
      }
      return day + "." + month + "." + year
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
footer {
  background: $color-blue;
  color: $color-white;
}
</style>
