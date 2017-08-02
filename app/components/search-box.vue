<template>
  <form 
    class="search-container"
    @submit="onSearch" 
    v-on:submit.prevent="onSearch">
    <input 
      id="search-box"
      class="search-box"
      type="text" 
      v-model="search"
      placeholder="Search Google..." />
    <label for="search-box">
      <!-- <span class="glyphicon glyphicon-search search-icon" /> -->
    </label>
    <button id="search-submit" type="submit">Search</button>
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