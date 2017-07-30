<template>
  <div>
    <h1 class="page-title">FotoFluent</h1>
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

<style>
  body {
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-color: #f7f7f7;
    font-family: 'Arial', 'sans-serif';
  }

  .translation {
    font-size: 48px;
    text-align: center;
  }
</style>
