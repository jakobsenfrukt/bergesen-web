<template>
  <div class="newsletter">
    <div class="signup">
      <!-- Begin Mailchimp Signup Form -->
      <div id="mc_embed_signup" class="newsletter-signup">
        <form action="https://bergesenstiftelsen.us2.list-manage.com/subscribe/post?u=8e079514aef908ccba6b3518c&amp;id=b1781df422" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
          <div id="mc_embed_signup_scroll">
            <div class="mc-field-group">
              <label for="mce-EMAIL">{{ t.label }}</label>
              <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" :placeholder="t.placeholder">
            </div>
            <div id="mce-responses" class="clear">
              <div class="response" id="mce-error-response" style="display:none"></div>
              <div class="response" id="mce-success-response" style="display:none"></div>
            </div>
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_8e079514aef908ccba6b3518c_b1781df422" tabindex="-1" value=""></div>
            <div class="clear button-wrapper"><input type="submit" :value="t.button" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
          </div>
        </form>
      </div>
      <!--End mc_embed_signup-->
    </div>
    <p class="newsletter-privacy">
      {{ t.privacy }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      no: {
        privacy: "Skriv inn din e-post for å holde deg oppdatert om søknadsfrister, tildelinger mm. Med dette samtykker du til å få informasjon fra oss på e-post. Du kan når som helst melde deg av.",
        placeholder: "Din e-postadresse",
        label: "E-post",
        button: "Send inn"
      },
      en: {
        privacy: "Sign up to receive updates on application deadlines, grants, etc. By signing up you agree to receiving information from us by e-mail. You can unsubscribe at any time.",
        placeholder: "Your e-mail",
        label: "E-mail",
        button: "Sign up"
      }
    }
  },
  computed: {
    t() {
      if (this.$store.state.english) {
        return this.en
      }
      return this.no
    }
  }
}
</script>


<style lang="scss">
@import '@/assets/css/variables.scss';
.newsletter {
  label {
    display: block;
    margin-bottom: .5rem;
  }
  .email {
    display: block;
    padding: .5rem 1rem;
    margin: 0;
    font-size: 1rem;
    font-family: $sans-serif;
    width: 100%;
    border-radius: 2rem;
    margin-bottom: .5rem;
    border: 2px solid $color-background;
    background: transparent;
    color: $color-background;
    &::placeholder {
      color: $color-background;
      opacity: .6;
      transition: opacity .3s ease;
    }
    &:focus {
      border-color: $color-green;
      outline: none;
      &::placeholder {
        color: $color-background;
        opacity: 0;
      }
    }
  }
  .button {
    margin: 0;
    outline: none;
    background: $color-background;
    border: none;
    font-size: 1rem;
    font-family: $sans-serif;
    font-weight: 500;
    width: 100%;
    max-width: none;
    padding: .75rem 3rem .75rem 1.5rem;
    text-align: left;
    border-radius: 2rem;
    &:hover {
      cursor: pointer;
      padding: .75rem 2rem .75rem 2.5rem;
    }
    &-wrapper {
      position: relative;
      &:before {
        content: "→";
        display: block;
        font-family: $sans-serif;
        color: $color-text;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
        opacity: 0;
        transition: all .3s ease;
      }
      &:hover {
        &:before {
          opacity: 1;
          left: 1rem;
        }
      }
    }
  }
  &-privacy {
    font-size: .8rem;
    font-weight: 400;
    line-height: 1.4;
    opacity: .6;
  }
}
</style>
