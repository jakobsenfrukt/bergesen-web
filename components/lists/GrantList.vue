<template>
  <div class="grants">
    <nav class="grant-filter">
      <div class="show-all">
        <button>Vis alle</button>
      </div>
      <div class="grant-filter-year">
        <label>
          <span>År</span>
          <select>
            <option>2020</option>
          </select>
        </label>
      </div>
      <div class="grant-filter-month">
        <label>
          <span>Måned</span>
          <select>
            <option>August</option>
          </select>
        </label>
      </div>
      <div class="grant-filter-search">
        <label>
          <span>Søk</span>
          <input type="text" />
        </label>
      </div>
    </nav>
    <ul class="grant-list">
      <li v-for="(grant, index) in grants" :key="index" class="grant">
        <span class="grant-date">{{ grant.date }}</span>
        <div class="grant-details">
          <span class="grant-title">{{ grant.title }}</span>
          <span class="grant-project">{{ grant.projectName }}</span>
        </div>
        <span class="grant-amount">kr {{ grant.grant }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    grants: Array
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.grant-filter {
  display: flex;
  margin: $spacing-l 0 1rem;

  div {
    margin-right: 1rem;
  }
}
.grant-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0 auto $spacing-l;
  border-top: 2px solid $color-text;
}
.grant {
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid $color-text;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: block;
  }

  &-date {
    width: 16%;
    min-width: 10rem;
  }

  &-date,
  &-amount {
    font-family: $sans-serif;
  }

  &-details {
    flex: 1;
    font-size: 1.2rem;
    span {
      display: inline-block;
    }
  }
  &-title {
    font-weight: 700;
    &:after {
      content: ": ";
    }
  }
}
@media (max-width: $media-s) {
  .grant {
    display: block;
  }
}
</style>
