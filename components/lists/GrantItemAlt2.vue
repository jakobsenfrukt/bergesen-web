<template>
  <li class="grant" :class="{ hasContent: hasContent, open: open }">
    <span class="grant-date">
      <Date :rawDate="grant.date" short />
    </span>
    <div class="grant-text">
      <div class="grant-header" @click="open = !open">
        <div class="grant-heading">
          <span class="grant-title">{{ grant.title }}</span>
          <span class="grant-project">{{ grant.projectname }}</span>
        </div>
        <span v-if="hasContent" class="grant-expand">{{ open ? t.hide : t.show }}</span>
      </div>
      <div class="grant-details" :class="{ open: open }" v-if="hasContent">
        <div class="wrapper">
          <div v-if="grant.mainimage.length" class="grant-image">
            <img :src="grant.mainimage[0].url" :alt="grant.mainimage[0].alt" :title="grant.mainimage[0].credit" />
          </div>
          <div class="grant-details-text" :class="{ noimage: !grant.mainimage}">
            <p v-if="grant.lead">{{ grant.lead }}</p>
          </div>
          <div v-if="grant.relatedarticle.length" class="grant-article">
            Artikkel:
            <NLink :to="grant.relatedarticle[0].uri" class="grant-article-link">{{ grant.relatedarticle[0].title }}</NLink>
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
      open: false,
      no: {
        show: 'Mer info',
        hide: 'Skjul info'
      },
      en: {
        show: 'More info',
        hide: 'Skjul info'
      }
    }
  },
  computed: {
    hasContent() {
      if (this.grant.lead || this.grant.mainimage.length || this.grant.relatedarticle.length) {
        return true
      }
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.grant {
  width: 100%;
  padding: 1rem 1.5rem;
  margin-bottom: .5rem;
  background: $color-background;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
  justify-content: space-between;
  align-items: flex-start;
  cursor: default;
  transition: all .3s ease;
  font-family: $sans-serif;

  &.hasContent {
    .grant-header {
      cursor: pointer;
    }
    &:hover {
      box-shadow: 0 0 0 2px $color-green;
    }
    &.open {
      &:hover {
        color: $color-text;
        box-shadow: none;
      }
    }
  }

  &-date {
    grid-column: 1 / span 2;
  }

  &-date,
  &-amount {
    font-weight: 700;
    color: $color-red;
    line-height: 3rem;
  }

  &-text {
    grid-column: 3 / span 7;
    padding-right: 2rem;
  }
  &-header {
    display: flex;
    min-height: 3rem;
    align-items: center;
  }
  &-heading {
    max-width: 80%;
  }
  &-title,
  &-project {
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.2;
  }
  &-title {
    font-weight: 500;
    margin: 0;
    &:after {
      content: ": ";
    }
  }
  &-project {
    font-weight: 400;
  }
  &-expand {
    display: inline-block;
    margin-left: auto;
    color: $color-darkestgreen;
    position: relative;
    font-size: 1rem;
    line-height: 1.2;
    &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: -.1em;
      left: 0;
      height: 2px;
      width: 100%;
      background: $color-darkgreen;
    }
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
        font-weight: 400;
      }
    }
    &-text {
      grid-column: 3 / span 4;

      &.noimage {
        grid-column: 1 / span 6;
      }
    }
  }
  &.open {
    .grant-details {
      display: block;
    }
  }
  &-amount {
    grid-column: 10 / span 3;
    text-align: right;
  }
  &-article {
    grid-column: 1 / span 6;
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
@media (min-width: $media-grantlist) {
  .grant {
    grid-template-columns: repeat(10, 1fr);
    &-date {
      grid-column: 1 / span 2;
    }
    &-text {
      grid-column: 3 / span 6;
    }
    &-details {
      .wrapper {
        grid-template-columns: repeat(5, 1fr);
        .grant-image {
          grid-column: 1 / span 2;
        }
      }
    }
    &-amount {
      grid-column: 9 / span 2;
    }
    &-article {
      grid-column: 1 / span 10;
    }
  }
}
@media (max-width: $media-s) {
  .grant {
    display: block;
  }
}
</style>
