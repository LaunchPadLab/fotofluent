<template>
  <span>
    <button @click="changeLanguage">
    {{ language.key }}
    </button>
  </span>  
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'playback',

    props: {
      language: Object
    },

    methods: {
      changeLanguage (e) {
        this.$store.commit('SET_LANGUAGE', this.language.value)
      }
    }
  }
</script>

