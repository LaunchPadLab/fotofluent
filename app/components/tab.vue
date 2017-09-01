<template>
  <div>
    <div class="language-text">You're learning {{ languageName }}</div>
    <Translation />

    <footer>
      <img class="logo" src="/images/logo-white.svg" />
      <div class="choose-language">
        <LanguageOption 
          v-for="lang in languages"
          :language="lang" 
          :key="lang.key" />
      </div>
    </footer>
  </div>

</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { LANGUAGES } from 'store'
  import Translation from './translation.vue'
  import LanguageOption from './language-option.vue'

  export default {
    components: {
      Translation,
      LanguageOption
    },

    data () {
      return {
        languages: LANGUAGES
      }
    },

    computed: {
      ...mapState([ 'translation', 'language' ]),

      languageName () {
        const languageOptions = this.languages
        return languageOptions.find(option => option.value === this.language).key
      },
    }
  }
</script>

<style lang="css">
  .translation {
    font-size: 48px;
    text-align: center;
  }
</style>
