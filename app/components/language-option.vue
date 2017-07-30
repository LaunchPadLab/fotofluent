<template>
  <span @click="changeLanguage">
    <img 
      :src="flagIcon" 
      alt="flag icon" 
      class="flag-icon" />
  </span>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'playback',

    props: {
      language: Object
    },

    computed: {
      flagIcon () {
        return this.language.image
      }
    },

    methods: {
      changeLanguage () {
        this.$store.commit('SET_LANGUAGE', this.language.value)
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

