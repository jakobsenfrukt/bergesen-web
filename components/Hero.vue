<template>
  <section class="hero">
    <div class="hero-background single" :style="cssVars">
      <div class="image-wrapper">
      </div>
    </div>
    <div class="hero-text">
      <div class="hero-text-wrapper">
        <div class="clear"></div>
        <div class="hero-lead" :class="leadClasses">
          <p>{{ lead }}</p>
        </div>
        <div class="hero-deadline">
          <NLink :to="link" class="hero-deadline-wrapper" :class="dateClasses">
            <h2 class="hero-deadline-title">{{ t.nextDeadline }}</h2>
            <div class="date">
              <span class="date-day">{{ date.day }}.</span>
              <span class="date-month">{{ date.month }}</span>
              <span class="date-time">{{ t.hour }}</span>
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
    link: String,
    banner: String,
    colorText: String,
    colorDate: String,
    colorDateMobile: String
  },
  data() {
    return {
      monthnames: {
        no: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
        en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      },
      no: {
        nextDeadline: "Neste søknadsfrist",
        hour: "kl. 12.00"
      },
      en: {
        nextDeadline: "Next deadline",
        hour: "12:00"
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
    },
    t() {
      if (this.english) {
        return this.en
      }
      return this.no
    },
    cssVars() {
      if (this.banner) {
        return {
          '--background-image': 'url(' + this.banner + ')'
        }
      }
    },
    leadClasses() {
      if (this.english && this.colorText) {
        return ['english', this.colorText]
      }
      if (this.english) {
        return 'english'
      }
      if (this.colorText) {
        return this.colorText
      }
    },
    dateClasses() {
      if (this.colorDateMobile && this.colorDate) {
        return [this.colorDateMobile, this.colorDate]
      }
      if (this.colorDateMobile) {
        return this.colorDateMobile
      }
      if (this.colorDate) {
        return this.colorDate
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.hero {
  --background-image: url(/graphics/hero/xmas/Hero-desember.svg);

  margin: 0 -2rem;
  grid-column: 1 / span 12;
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
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
      width: 100%;
      margin: 0;
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
    padding: 0 2rem;
    font-family: $serif-fine;
    color: $color-text;

    &.english {
      font-size: 1.8rem;
    }
    &.white {
      color: $color-white;
    }
    &.darkblue {
      color: $color-text;
    }
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

      &.white {
        background: $color-white;
        color: $color-text;
      }
      &.darkblue {
        background: $color-text;
        color: $color-white;
      }
    }
    &-title {
      margin-bottom: 0;
      font-family: $sans-serif;
    }
    .date {
      font-family: $sans-serif;
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 1.4;

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
      padding-top: 63%;
      position: relative;
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

    &.single {
      display: block;
      .image-wrapper {
        width: 100%;
        padding-top: 21%;
        background: var(--background-image);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 0 0;
      }
    }
  }
}
@media (max-width: 1400px) {
  .hero {
    &-lead.english {
      font-size: 1.6rem;
    }
  }
}
@media (max-width: $media-m) {
  .hero {
    &-background {
      display: block;
      .image-wrapper {
        &:first-of-type {
          display: none;
        }
      }
      &.single {
        display: block;

        .image-wrapper {
          width: 100%;
          padding-top: 32%;
          background: var(--background-image);
          background-repeat: no-repeat;
          background-size: auto 100%;
          background-position: 100% 0;
          &:first-of-type {
            display: block;
          }
        }
      }
    }
    &-text {
      &-wrapper {
        grid-template-columns: 1fr 1fr;
      }
      .clear {
        display: none;
      }
    }
    &-lead.english {
      font-size: 1.6rem;
    }
  }
}
@media (max-width: $media-s) {
  .hero {
    margin: 0 -1rem 2rem;
    &-background {
      display: block;
      &.single {
        .image-wrapper {
          width: 100%;
          padding-top: 63%;
          background: var(--background-image);
          background-repeat: no-repeat;
          background-size: auto 100%;
          background-position: 50% 0;
          &:first-of-type {
            display: block;
          }
        }
      }
    }
    &-text {
      position: static;
      display: block;
      width: 100%;

      &-wrapper {
        display: grid;
        grid-template-columns: 1fr;
        align-items: center;
        width: 100%;
        padding: 0;
        margin: 0;

        .clear {
          display: none;
        }
      }
    }
    &-lead {
      width: 100%;
      padding: .6rem 2rem;
      position: absolute;
      top: 0;
      bottom: 3.8rem;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      &.english {
        font-size: 1.8rem;
      }
    }
    &-deadline {
      &-wrapper {
        font-family: $sans-serif;
        font-size: 1.3rem;
        background: $color-text;
        color: $color-white;
        display: block;
        padding: 1rem 1rem 1.2rem;
        margin: 0 auto;
        text-decoration: none;
        &.white {
          background: $color-text;
          color: $color-white;
        }
        &.darkblue {
          background: $color-text;
          color: $color-white;
        }
        &.whiteMobile,
        &.whiteMobile.white,
        &.whiteMobile.darkblue {
          background: $color-text;
          color: $color-white;
        }
        &.greenMobile,
        &.greenMobile.white,
        &.greenMobile.darkblue {
          background: $color-green;
          color: $color-text;
        }
      }
      &-title {
        font-family: inherit;
        display: inline;
        color: inherit;
        font-size: inherit;
        &:after {
          content: ":";
        }
      }
      .date {
        display: inline;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        font-weight: 700;

        &-time {
          display: inline;
          font-size: inherit;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
