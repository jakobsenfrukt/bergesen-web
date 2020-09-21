<template>
  <section>
    <h2 v-if="heading" class="person-list__heading">{{ heading }}</h2>
    <ul class="person-list">
      <li v-for="(person, index) in people" :key="index" class="person">
        <div class="person-image">
          <div class="image-wrapper">
            <img v-if="person.image.length" :src="person.image[0].url" />
          </div>
        </div>
        <div class="person-text">
          <h3 class="person-name">{{ person.fullname }}</h3>
          <span class="person-role">{{ person.role }}</span>
          <p class="person-contact">
            <span class="person-phone">{{ person.phone }}</span>
            <span class="person-email">{{ person.email }}</span>
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    people: Array,
    heading: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.person-list {
  list-style: none;
  margin: 0 auto $spacing-m;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 2rem;

  &__heading {
    font-style: italic;
  }
}
.person {
  margin: 0 0 $spacing-s;

  &-image {
    .image-wrapper {
      width: 100%;
      padding-top: 133.333%;
      position: relative;
      overflow: hidden;
      margin-bottom: $spacing-s;
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
    }
  }

  &-name {
    font-size: 1.2rem;
    margin-bottom: .24rem;
  }

  &-role {
    font-size: 1.1rem;
    color: $color-red;
    font-family: $sans-serif;
    line-height: 1;
  }

  &-contact {
    margin: 0;
    span {
      display: block;
      font-family: $sans-serif;
      font-weight: 500;
    }
  }
}
@media (min-width: $media-l) {
  .person-list {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
@media (max-width: $media-s) {
  .person-list {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
