<template>
  <div>
    <h1 class="page-title">FotoFluent</h1>
    <SearchBox></SearchBox>
    <Translation :translation="translation" v-if="translation"></Translation>
  </div>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'
  import Translation from './translation.vue'
  import SearchBox from './search-box.vue'

  export default {
    name: 'tab',
    components: {
      Translation,
      SearchBox,
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
          .catch(err => console.log(err))
      }
    }
  }
</script>

<style>
  body {
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background: #f7f7f7;
    font-family: 'Arial', 'sans-serif';
  }

  .translation {
    font-size: 48px;
    text-align: center;
  }
</style>
