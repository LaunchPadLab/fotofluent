<template>
  <span @click="changeLanguage">
    <img 
      :src="flagIcon" 
      alt="flag icon" 
      class="flag-icon"
      :class="{ 'large-icon': clicked, 'small-icon': !clicked }" />
  </span>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'playback',

    props: {
      language: Object
    },

    data() {
      return {
        clicked: false
      }
    },

    computed: {
      flagIcon () {
        return this.language.image
      },
      languageSelected () {
        return this.language.value === this.$store.state.language
      }
    },

    methods: {
      async changeLanguage () {
        await this.$store.commit('SET_LANGUAGE', this.language.value)
        this.resizeIcon()
      },
      resizeIcon () {
        this.clicked = !this.clicked
      },
      iconStyles () {
        console.log('lang value: ', this.language.value)
        console.log('store lang: ', this.$store.state.language)
        console.log(this.languageSelected)
      }
    }
  }
</script>

<style>
  .flag-icon {
    margin-bottom: 20px;
  }

  .large-icon {
    height: 50px;
    width: auto;
  }

  .small-icon {
    height: 30px;
    width: auto;
  }
</style>

