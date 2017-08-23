<template>
  <button 
    id="playback-btn" 
    @click="triggerAudio" 
    v-if="language">
    Play Audio
  </button>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([ 'translation', 'language' ])
    },

    methods: {
      triggerAudio () {
        chrome.tts.speak(
          this.translation.foreign_word, {
            'lang': this.language,
            'rate': 0.6
          }
        )
      }
    }
  }
</script>
