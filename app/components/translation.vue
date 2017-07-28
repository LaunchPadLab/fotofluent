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
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        showTranslation: false,
      }
    },
    computed: {
      ...mapState(['translation'])
    },
    methods: {
      toggleTranslation () {
        this.showTranslation = !this.showTranslation
      }
    }
  }
</script>