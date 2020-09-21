<template>
  <span>{{ date }}</span>
</template>

<script>
export default {
  props: {
    rawDate: String,
    short: Boolean,
    yearonly: Boolean
  },
  data() {
    return {
      monthnames: {
        no: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
        en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      }
    }
  },
  computed: {
    date() {
      const dateObject = new Date(this.rawDate);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth();
      const day = dateObject.getDate();
      const monthnumber = dateObject.getMonth() +1;
      if (this.short) {
        if (this.en) {
          return this.monthnames.en[month] + " " + year
        } else {
          return this.monthnames.no[month] + " " + year
        }
      }
      if (this.yearonly) {
        return year
      }
      return day + "." + monthnumber + "." + year
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
