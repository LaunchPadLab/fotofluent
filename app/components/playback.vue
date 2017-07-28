<template>
  <div>
    <button @click="triggerAudio" v-if="translation && translation.language">
      Play Audio Translation
    </button>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'playback',
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
      },
      triggerAudio () {
        chrome.tts.speak(
          this.translation.foreign_word, { 
            'lang': this.translation.language.tts_key, 
            'rate': 0.6
          }
        )
      }
    }
  }
</script>

