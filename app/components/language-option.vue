<template>
  <span @click="setLanguage">
    <img 
      :src="flagIcon" 
      alt="flag icon" 
      class="flag-icon"
      :class="{ large: isCurrentLanguage }" />
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
      ...mapState({
        storeLanguage: 'language'
      }),
      flagIcon () {
        return this.language.image
      },
      isCurrentLanguage () {
        return this.language.value == this.storeLanguage
      },
    },

    methods: {
      setLanguage () {
        store.dispatch('UPDATE_LANGUAGE', this.language.value)
      }
    }
  }
</script>

<style scoped="true" lang="css">
  .flag-icon {
    margin-bottom: 20px;
    height: 30px;
    width: auto;
  }

  .large {
    height: 40px;
    width: auto;
  }
</style>

