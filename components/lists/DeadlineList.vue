<template>
  <div class="deadlines">
    <ul class="deadline-list">
      <li v-for="(deadline, index) in futureDeadlines" :key="index" class="deadline">
        <Date :rawDate="deadline.date" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    deadlines: Array
  },
  computed: {
    futureDeadlines() {
      var today = new Date();
      return this.deadlines.filter(function(deadline) {
        var deadlineDate = new Date(deadline.date);
        return deadlineDate >= today;
      });
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.deadline-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0 auto $spacing-l;
  display: flex;
}
.deadline {
  width: 100%;
  padding: 1rem 0;
  background: $color-lightestred;
  font-family: $sans-serif;
  text-align: center;

  &:nth-child(even) {
    background: $color-lightgreen;
  }
}
@media (max-width: $media-s) {
  .deadline {
    display: block;
  }
}
</style>
