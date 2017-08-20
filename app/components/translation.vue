<template>
  <div class="translation">
    <div v-if="translation && translation.foreign_word">
      <p>{{ translation.foreign_word }}</p><br>
      
      <button id="translate-btn"@click="next">
        Next Word
      </button>

      <button id="translate-btn"@click="toggleTranslation">
        <span v-if="!showTranslation">Show Translation</span>
        <span v-else>Hide Translation</span>
      </button>

      <Playback />

      <br>
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
  import store from 'store'
  import { mapState, mapActions } from 'vuex'
  import Playback from './playback.vue'

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
      ...mapActions({
        next: 'REQUEST_DATA',
      }),
      toggleTranslation () {
        this.showTranslation = !this.showTranslation
      }
    }
  }
</script>
