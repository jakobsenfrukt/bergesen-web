<template>
  <div class="deadlines">
    <div class="deadline deadline-next">
      <h2 class="deadline-title">Neste søknadsfrist</h2>
      <div class="date date-next">
        <span class="date-day">{{ formatDate(nextDeadline.date).day }}.</span>
        <span class="date-month">{{ formatDate(nextDeadline.date).month }}</span>
        <span class="date-time">kl. 12.00</span>
      </div>
    </div>
    <h2>Kommende søknadsfrister</h2>
    <ul class="deadline-list">
      <li v-for="(deadline, index) in futureDeadlines" :key="index" class="deadline">
        <div class="date">
          <span class="date-day">{{ formatDate(deadline.date).day }}.</span>
          <span class="date-month">{{ formatDate(deadline.date).month }}</span>
        </div>
      </li>
    </ul>
    <Button href="#" text="Last ned søknadsskjema" />
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
  max-width: 36rem;
  list-style: none;
  padding: 0;
  margin: 0 0 $spacing-m;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: $color-lightestgray;

  .deadline {
    text-align: center;
    border-right: 2px solid $color-background;
    &:last-of-type {
      border-right: none;
    }
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
    font-family: $serif-extended;
    font-size: 2rem;
    color: $color-darkgreen;
  }

  .date {
    font-family: $sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.2;
    text-transform: lowercase;

    &-time {
      display: block;
      font-size: 1.2rem;
      font-weight: 500;
    }

    &-next {
      font-family: $sans-serif;
      font-size: 2rem;
      font-weight: 700;

      .date-time {
        display: inline;
        font-size: 2rem;
      }
    }
  }
  &-next {
    background: $color-lightestgreen;
    margin: 2rem 0 $spacing-m;
    max-width: 36rem;
    padding: 1.4rem 2rem 2rem;
  }
}
@media (max-width: $media-s) {
  .deadline {
    display: block;
  }
}
</style>
