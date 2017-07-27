<template>
  <div class="translation">
    <p>{{ translation.foreign_word }}</p>
    <a class="play-link" v-on:click="playWord">Hear word</a>

    <button id="translate-btn" v-on:click="toggleTranslation">
      <span v-if="!showTranslation">Show Translation</span>
      <span v-else>Hide Translation</span>
    </button>
    <div v-if="showTranslation">
      <p>{{ translation.word.word }}</p>
    </div>
  </div>
</template>

<script>
  import store from '../store/index.js'

  export default {
    props: {
      translation: Object
    },
    data () {
      return {
        showTranslation: false,
      }
    },
    methods: {
      toggleTranslation () {
        this.showTranslation = !this.showTranslation
      },
      playWord () {
        const language = store.getters.selectedLanguage
        chrome.tts.speak(translation.foreign_word, { lang: language })
      }
    }
  }
</script>