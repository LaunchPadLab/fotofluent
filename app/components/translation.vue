<template>
  <div class="translation">
    <p>{{ foreignWord }}</p>

    <button id="translate-btn" v-on:click="toggleTranslation">
      <span v-if="!showTranslation">Show Translation</span>
      <span v-else>Hide Translation</span>
    </button>
    <p v-if="showTranslation">{{ englishTranslation }}</p>
  </div>
</template>

<script>
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
      toggleTranslation() {
        this.showTranslation = !this.showTranslation
      }
    }
  }
</script>