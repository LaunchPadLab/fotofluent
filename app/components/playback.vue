<template>
  <div>
    <button @click="triggerAudio" v-if="language">
      Play Audio Translation
    </button>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'playback',

    computed: {
      ...mapState(['translation', 'language'])
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

