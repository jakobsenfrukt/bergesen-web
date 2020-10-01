<template>
  <section class="hero">
    <div class="hero-background">
      <div class="image-wrapper">
        <img src="/graphics/shapes/Bergesen14.svg" alt="Grafiske former i Bergesenstiftelsens farger" />
      </div>
      <div class="image-wrapper">
        <img src="/graphics/shapes/Bergesen15.svg" alt="Grafiske former i Bergesenstiftelsens farger" />
      </div>
      <div class="image-wrapper">
        <img src="/graphics/shapes/Bergesen18.svg" alt="Grafiske former i Bergesenstiftelsens farger" />
      </div>
      <div class="image-wrapper">
        <img src="/graphics/shapes/Bergesen24.svg" alt="Grafiske former i Bergesenstiftelsens farger" />
      </div>
    </div>
    <div class="hero-text">
      <div class="hero-text-wrapper">
        <div class="clear"></div>
        <div class="hero-lead">
          <p>{{ lead }}</p>
        </div>
        <div class="hero-deadline">
          <NLink :to="link" class="hero-deadline-wrapper">
            <h2 class="hero-deadline-title">Neste<br />søknadsfrist</h2>
            <div class="date">
              <span class="date-day">{{ date.day }}.</span>
              <span class="date-month">{{ date.month }}</span>
              <span class="date-time">kl. 12.00</span>
            </div>
          </NLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    lead: String,
    deadline: Object,
    link: String
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
    date() {
      const dateObject = new Date(this.deadline.date);
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
    },
    english() {
      return this.$store.state.english
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.hero {
  margin: 0 -2rem 2rem;
  position: relative;
  background: transparent;
  padding: 0;

  &-text {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;

    &-wrapper {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      align-items: center;
      width: 100%;
      margin: 2rem auto 3rem;
    }
  }
  &-lead,
  &-deadline {
    position: relative;
    z-index: 1;
  }
  &-lead {
    font-size: 2rem;
    line-height: 1.3;
    text-align: center;
    margin: 0 auto;
    max-width: 800px;
    font-family: $serif-fine;
    color: $color-white;
  }
  &-deadline {
    text-align: center;
    &-wrapper {
      background: $color-white;
      display: inline-block;
      padding: 1.5rem 1.5rem 2rem;
      margin: 0 auto;
      text-decoration: none;
      color: inherit;
    }
    &-title {
      margin-bottom: .5rem;
      color: $color-darkgreen;
      font-family: $serif-extended;
    }
    .date {
      font-family: $sans-serif;
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 1.2;
      color: $color-red;
      text-transform: lowercase;

      &-time {
        display: block;
        font-size: 1.2rem;
        font-weight: 500;
      }
    }
  }
  &-background {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;

    .image-wrapper {
      padding-top: 100%;
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
    }
  }
}
@media (min-width: $media-xl) {
  .hero {
    &-background {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
}
@media (max-width: $media-xl) {
  .hero {
    &-background {
      .image-wrapper {
        &:first-of-type {
          display: none;
        }
      }
    }
  }
}
@media (max-width: $media-s) {
  .hero {
    margin: -.5rem -1rem 2rem;
    &-background {
      grid-template-columns: 1fr;
      .image-wrapper {
        &:first-of-type,
        &:last-of-type {
          display: none;
        }
      }
    }
    &-text {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;

      &-wrapper {
        display: grid;
        grid-template-columns: 1fr;
        align-items: center;
        width: 100%;
        padding: 0 2rem;
        margin: 0;

        .clear {
          display: none;
        }
      }
    }
    &-lead {
      font-size: 1.8rem;
    }
  }
}
</style>
