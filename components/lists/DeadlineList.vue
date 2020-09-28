<template>
  <div class="deadlines">
    <div class="deadline deadline-next">
      <h2 class="deadline-title">Neste søknadsfrist</h2>
      <div class="date date-next">
        <span class="date-day">{{ formatDate(nextDeadline.date).day }}.</span>
        <span class="date-month">{{ formatDate(nextDeadline.date).month }}</span>
        <span class="date-time">kl. 12.00</span>
      </div>
      <Button href="#" text="Last ned søknadsskjema" />
    </div>
    <h2>Kommende søknadsfrister</h2>
    <ul class="deadline-list">
      <li v-for="(deadline, index) in futureDeadlines" :key="index" class="deadline">
        <div class="date">
          <span class="date-day">{{ formatDate(deadline.date).day }}.</span>
          <span class="date-month">{{ formatDate(deadline.date).month }}</span>
          <span class="date-time">kl. 12.00</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    deadlines: Array
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
    futureDeadlines() {
      var today = new Date();
      return this.deadlines.filter(function(deadline) {
        var deadlineDate = new Date(deadline.date);
        return deadlineDate >= today;
      });
    },
    nextDeadline() {
      return this.futureDeadlines[0]
    },
    english() {
      return this.$store.state.english
    }
  },
  methods: {
    formatDate(date) {
      const dateObject = new Date(date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth();
      const day = dateObject.getDate();
      const monthnumber = dateObject.getMonth() +1;
      if (this.english) {
        return {
          day: day,
          month: this.monthnames.en[month]
        }
      } else {
        return {
          day: day,
          month: this.monthnames.no[month]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.deadline-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0 auto $spacing-l;

  .deadline {
    &:first-of-type {
      display: none;
    }
  }
}
.deadline {
  width: 100%;
  padding: 1rem 0;

  &-title {
    margin-bottom: .5rem;
    color: $color-darkgreen;
    font-family: $serif-extended;
    font-size: 2rem;
  }

  .date {
    font-family: $sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.2;
    text-transform: lowercase;

    &-time {
      display: block;
      font-size: 1.2rem;
      font-weight: 500;
    }

    &-next {
      color: $color-red;
      font-size: 2rem;
    }
  }
}
@media (max-width: $media-s) {
  .deadline {
    display: block;
  }
}
</style>
