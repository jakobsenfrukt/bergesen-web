<template>
  <div class="deadlines">
    <div class="deadline deadline-next">
      <h2 class="deadline-title">{{ t.nextDeadline }}</h2>
      <div class="date date-next">
        <span class="date-day">{{ formatDate(nextDeadline.date).day }}.</span>
        <span class="date-month">{{ formatDate(nextDeadline.date).month }}</span>
        <span class="date-time">{{ t.hour }}</span>
      </div>
      <span class="deadline-details">{{ nextDeadline.details}}</span>
    </div>
    <h2>{{ t.comingDeadlines }}</h2>
    <ul class="deadline-list">
      <li v-for="(deadline, index) in futureDeadlines.slice(0, 4)" :key="index" class="deadline">
        <div class="date">
          <span class="date-day">{{ formatDate(deadline.date).day }}.</span>
          <span class="date-month">{{ formatDate(deadline.date).month }}</span>
        </div>
        <span class="deadline-details">{{ deadline.details }}</span>
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
        no: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
        en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      },
      no: {
        nextDeadline: 'Neste søknadsfrist',
        comingDeadlines: 'Kommende søknadsfrister',
        hour: 'kl. 12.00'
      },
      en: {
        nextDeadline: 'Next deadline',
        comingDeadlines: 'Coming deadlines',
        hour: '12:00'
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
    },
    t() {
      if (this.english) {
        return this.en
      }
      return this.no
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
.deadlines h2, .deadline-details {
  font-family: $sans-serif;
  font-weight: 400;
}
.deadline-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0 0 $spacing-m 2rem;

  .deadline {
    position: relative;
    margin-bottom: 1rem;
    &:before {
      content: url(/graphics/shapes/Bergesen2.svg);
      width: .6em;
      height: .6em;
      display: block;
      position: absolute;
      top: 0;
      left: -1.4em;
      overflow: visible;
    }
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

  &-title {
    margin-bottom: .5rem;
    font-family: $sans-serif;
    font-size: 2rem;
    color: $color-text;
  }

  .date {
    font-family: $sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.2;

    &-time {
      display: block;
      font-size: 1.2rem;
      font-weight: 400;
    }

    &-next {
      font-family: $sans-serif;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: .6rem;

      .date-time {
        display: inline;
        font-size: 2rem;
      }
    }
  }
  &-next {
    background: $color-lightgreen;
    margin: 2rem 0 $spacing-m;
    max-width: 36rem;
    padding: 1.4rem 2rem 2rem;
  }
}
@media (max-width: $media-s) {
  .deadline {
    display: block;
    &-next {
      padding: 1rem 1.5rem;;
    }
  }
}
</style>
