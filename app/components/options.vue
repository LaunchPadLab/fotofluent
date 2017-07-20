<template>
  <div>
    <h1>FotoFluent Options</h1>
    
    <form>
      <ul>
        <li>
          <h2>Choose a language</h2>
          <select id="language" v-model="language" @change="onLanguageSelect">
            <option v-for="lang in LANGUAGES" :value="lang.value">{{ lang.key }}</option>
          </select>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
  import store, { LANGUAGES } from '../store/index.js'
  import { mapState } from 'vuex'

  export default {
    name: 'options',
    
    data: () => ({
      LANGUAGES
    }),
    
    methods: {
      onLanguageSelect (e) {
        store.commit('SET_LANGUAGE', e.target.value)
      }
    },
    
    computed: {
      ...mapState([ 'language' ])
    }
  }
</script>