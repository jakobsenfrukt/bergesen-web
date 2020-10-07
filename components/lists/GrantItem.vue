<template>
  <li class="grant">
    <span class="grant-date">
      <Date :rawDate="grant.date" short />
    </span>
    <div class="grant-text">
      <span class="grant-title">{{ grant.title }}</span>
      <span class="grant-project">{{ grant.projectname }}</span>
      <div class="grant-expand" v-if="grant.lead" @click="open = !open">&darr;</div>
      <div class="grant-details" :class="{ open: open }" v-if="grant.lead">
        <div class="wrapper">
          <div v-if="grant.mainimage" class="grant-image">
            <img :src="grant.mainimage[0].url" alt="Alternativ tekst" />
          </div>
          <div class="grant-details-text" :class="{ noimage: !grant.mainimage}">
            <p v-if="grant.lead">{{ grant.lead }}</p>
            <div class="grant-article">
              Artikkel:
              <NLink v-if="grant.relatedarticle" to="#" class="grant-article-link">{{ grant.relatedarticle[0].title }}</NLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span class="grant-amount">{{ isNaN(grant.grantedsum) ? "" : "kr " + Number(grant.grantedsum).toLocaleString('nb-NO') }}</span>
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
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
  justify-content: space-between;
  align-items: flex-start;

  span {
    display: inline-block;
  }

  &-date {
    grid-column: 1 / span 2;
  }

  &-date,
  &-amount {
    font-family: $sans-serif;
    font-weight: 700;
    color: $color-darkgreen;
    line-height: 2.2rem;
  }

  &-text {
    grid-column: 3 / span 7;
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
    display: none;

    .wrapper {
      padding: 1rem 0 1.2rem;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      .grant-image {
        grid-column: 1 / span 2;
        margin-right: 1.2rem;
      }
      p {
        font-size: .9rem;
        margin: 0;
      }
    }
    &-text {
      grid-column: 3 / span 4;

      &.noimage {
        grid-column: 1 / span 4;
      }
    }
    &.open {
      display: flex;
    }
  }
  &-amount {
    grid-column: 10 / span 3;
    text-align: right;
  }
  &-article {
    display: block;
    background: $color-lightestgray;
    font-family: $sans-serif;
    font-weight: 400;
    margin: 1rem 0;
    padding: .3rem 1rem;
    &-link {
      color: $color-text;
      font-weight: 700;
      text-decoration: none;
      display: inline-block;
      position: relative;
      transition: all .3s ease;
      &:before {
        content: "→";
        display: inline;
        font-family: $sans-serif;
        position: absolute;
        left: .5rem;
        opacity: 0;
        transform: translateX(-100%);
        transition: all .3s ease;
      }
      &:hover {
        padding-left: 2rem;
        &:before {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }
  }
}
@media (max-width: $media-s) {
  .grant {
    display: block;
  }
}
</style>
