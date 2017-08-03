<template>
  <div class="translation">
    <div v-if="translation">
      <p>{{ translation.foreign_word }}</p>

      <button id="translate-btn" v-on:click="toggleTranslation">
        <span v-if="!showTranslation">Show Translation</span>
        <span v-else>Hide Translation</span>
      </button>

      <Playback />

      <p v-if="showTranslation">
        {{ translation.word.word }}
      </p>
    </div>

    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
  import Playback from './Playback.vue'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        showTranslation: false,
      }
    },
    components: {
      Playback
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
