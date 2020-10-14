<template>
  <section>
    <h2 class="person-list__heading">{{ t.board }}</h2>
    <ul class="person-list">
      <li v-for="(person, index) in people" :key="index" class="person">
        <div class="person-image">
          <div class="image-wrapper">
            <img v-if="person.image.length" :src="person.image[0].url" :alt="`Portrettbilde av ${person.fullname}`" :title="person.image[0].credit" />
          </div>
        </div>
        <div class="person-text">
          <h3 class="person-name">{{ person.fullname }}</h3>
          <span class="person-role">{{ person.role }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    people: Array
  },
  data() {
    return {
      no: {
        board: "Styret"
      },
      en: {
        board: "Board members"
      }
    }
  },
  computed: {
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
.person-list {
  list-style: none;
  margin: 0 0 $spacing-m;
  padding: 0;
  width: 100%;
  display: block;

  &__heading {
    font-size: 2rem;
  }
}
.person {
  display: flex;
  align-items: center;
  margin: 0 0 $spacing-s;

  &-image {
    width: 130px;
    .image-wrapper {
      width: 100%;
      padding-top: 140%;
      position: relative;
      overflow: hidden;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      object-fit: cover;
      object-position: top;
      filter: grayscale(100%);
      transition: all .3s ease;
      &:hover {
        filter: grayscale(0);
      }
    }
  }

  &-name {
    font-size: 1.3rem;
    margin: 0 0 .24rem;
  }

  &-role {
    font-size: 1.1rem;
    color: $color-red;
    font-family: $sans-serif;
    font-weight: 400;
    line-height: 1;
  }

  &-text {
    padding-left: 2rem;
  }
}
.contactpage {
  .person-image {
    .image-wrapper {
      width: 100%;
      padding-top: 100%;
    }
  }
}
@media (max-width: $media-s) {
  .person-list {
    .person {
      &-image {
        width: 100px;
      }
    }
  }
}
</style>
