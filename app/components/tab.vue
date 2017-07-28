<template>
  <div>
    <h1 class="page-title">FotoFluent ({{ language }})</h1>
    <SearchBox />
    <Translation v-if="translation" />
    <TopSites />
  </div>
</template>

<script>
  import Translation from './translation.vue'
  import SearchBox from './search-box.vue'
  import TopSites from './top-sites.vue'
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'tab',
    components: {
      Translation,
      SearchBox,
      TopSites,
    },

    mounted () {
      this.requestData()
      this.requestTopSites()
    },

    methods: {
      ...mapActions({ 
        requestData: 'REQUEST_DATA',
        requestTopSites: 'REQUEST_TOP_SITES',
      })
    },
    
    computed: {
      ...mapState([ 'translation', 'language' ])
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
