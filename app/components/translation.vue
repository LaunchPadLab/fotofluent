<template>
  <div>
    <p v-if="translation">{{ foreignWord }}</p>
    <p v-else>Loading....</p>

    <div id="translate-btn" v-on:click="triggerTranslation">
      <p v-if="showTranslation">{{ englishTranslation }}</p>
      <p v-else>Translate</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: ['translation'],
    data() {
      return {
        foreignWord: this.translation.foreign_word,
        englishTranslation: this.translation.word.word,
        showTranslation: false
      }
    },
    methods: {
      triggerTranslation() {
        this.showTranslation = !this.showTranslation
      }
    }
  }
</script>