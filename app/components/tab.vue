<template>
  <div>
    <p>FotoFluent</p>
    <Translation :translation="translation" v-if="translation"></Translation>
  </div>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'
  import Translation from './translation.vue'

  export default {
    name: 'tab',
    components: {
      Translation
    },
    data() {
      return {
        translation: null,
        image: null      
      }
    },
    mounted() {
      this.requestData()
    },
    methods: {
      requestData() {
        axios.get(`https://fotofluent-admin.herokuapp.com/translations.json`)
          .then(response => {
            this.translation = _.sample(response.data)
            this.image = this.translation.word.image
            document.body.style.backgroundImage = `url(${this.image})`
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style>
  body {
    background: url('https://images.unsplash.com/photo-1482100199117-a4a38a64e7e3?dpr=1') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    font-family: 'Arial', 'sans-serif';
  }

  .translation {
    font-size: 48px;
    text-align: center;
  }
</style>
