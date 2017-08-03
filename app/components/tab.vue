<template>
  <div>
    <img class="logo" src="/images/logo.png">
    <LanguageOption v-for="lang in languages" :language="lang" :key="lang.key" />
    <SearchBox />
    <Translation />
    <TopSites />
  </div>
</template>

<script>
  import Translation from './translation.vue'
  import SearchBox from './search-box.vue'
  import TopSites from './top-sites.vue'
  import LanguageOption from './language-option.vue'
  import { LANGUAGES } from '../store/index.js'
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'tab',
    components: {
      Translation,
      SearchBox,
      TopSites,
      LanguageOption
    },

    mounted () {
      this.requestTopSites()
    },

    data () {
      return {
        languages: LANGUAGES
      }
    },

    methods: {
      ...mapActions({
        requestTopSites: 'REQUEST_TOP_SITES',
      })
    },

    computed: {
      ...mapState([ 'translation', 'language' ]),
      flagIcon() {
        return this.translation.language.flag.url
      }
    }
  }
</script>

<style lang="css">
  .translation {
    font-size: 48px;
    text-align: center;
  }
</style>
