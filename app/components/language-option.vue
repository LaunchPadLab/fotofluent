<template>
  <span @click="setLanguage">
    <img 
      :src="flagIcon" 
      alt="flag icon" 
      class="flag-icon" />
  </span>
</template>

<script>
  import store from '../store/index.js'
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'language-option',

    props: {
      language: Object
    },

    computed: {
      flagIcon () {
        return this.language.image
      }
    },

    methods: {
      setLanguage () {
        store.commit('SET_LANGUAGE', this.language.value)
      }
    }
  }
</script>

<style>
  .flag-icon {
    margin-bottom: 20px;
    height: 30px;
    width: auto;
  }
</style>

