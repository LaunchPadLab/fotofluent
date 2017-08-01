<template>
  <form action="?" @submit="onSearch" v-on:submit.prevent="onSearch">
    <input 
      type="text" 
      v-model="search"
      placeholder="Search Google..." />
    <button style="display:none;" type="submit">Search</button>
  </form>
</template>

<script>
  import { googleSearch } from '../lib/helpers.js'

  export default {
    name: 'search-box',
    
    data () {
      return {
        search: '',
      }
    },

    methods: {
      onSearch () { googleSearch(this.search) }
    }
  }
</script>