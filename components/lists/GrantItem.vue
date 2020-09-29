<template>
  <li class="grant">
    <span class="grant-date">{{ grant.date }}</span>
    <div class="grant-text">
      <span class="grant-title">{{ grant.title }}</span>
      <span class="grant-project">{{ grant.projectname }}</span>
      <div class="grant-expand" v-if="grant.lead" @click="open = !open">&darr;</div>
      <div class="grant-details" :class="{ open: open }" v-if="grant.lead">
        <div class="wrapper">
          <div v-if="grant.image" class="grant-image">
            <img src="https://test.bergesen-cms.444.no/assets/bilder/Edvard_Munch_-_Red_and_White_-_Google_Art_Project.jpg" />
          </div>
          <div class="grant-details-text">
            <p v-if="grant.lead">{{ grant.lead }}</p>
            <NLink to="#" class="grant-article">Artikkel</NLink>
          </div>
        </div>
      </div>
    </div>
    <span class="grant-amount">kr {{ grant.grantedsum }}</span>
  </li>
</template>

<script>
export default {
  props: {
    grant: Object
  },
  data() {
    return {
      open: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.grant {
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid $color-text;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

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
    font-weight: 700;
    color: $color-darkgreen;
    line-height: 2.2rem;
  }

  &-text {
    flex: 1;
    padding-right: 2rem;
    span {
      display: inline-block;
    }
  }
  &-title,
  &-project {
    font-weight: 400;
    font-size: 1.4rem;
  }
  &-title {
    margin: 0;
    &:after {
      content: ": ";
    }
  }
  &-project {
    font-style: italic;
  }
  &-expand {
    display: inline-block;
    margin-left: 2rem;
    &:hover {
      cursor: pointer;
    }
  }
  &-details {
    max-width: 42rem;
    display: none;

    .wrapper {
      padding: 1rem 0 1.2rem;
      display: flex;
      .grant-image {
        width: 20rem;
        margin-right: 1.2rem;
      }
      p {
        font-size: .9rem;
        margin: 0;
      }
    }
    &.open {
      display: flex;
    }
  }
  &-article {
    display: block;
    background: $color-lightestgray;
    margin: 1rem 0;
    padding: .3rem 1rem;
  }
}
@media (max-width: $media-s) {
  .grant {
    display: block;
  }
}
</style>
