<template>
  <div class="translation">
    <p>{{ translation.foreign_word }}</p>

    <button id="translate-btn" v-on:click="toggleTranslation">
      <span v-if="!showTranslation">Show Translation</span>
      <span v-else>Hide Translation</span>
    </button>
    <p v-if="showTranslation">{{ translation.word.word }}</p>
  </div>
</template>

<script>
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
      }
    }
  }
</script>