<template>
  <form 
    class="search-container"
    @submit="onSearch" 
    :submit.prevent="onSearch">
    <input 
      id="search-box"
      class="search-box"
      type="text" 
      v-model="search"
      placeholder="Search Google..." />
    <label for="search-box">
      <img src="/images/search.svg" class="search-icon"/>
    </label>
    <button id="search-submit" type="submit">Search</button>
  </form>
</template>

<script>
  import { googleSearchUrl } from 'helpers'

  export default {
    data () {
      return {
        search: '',
      }
    },

    methods: {
      onSearch () { 
        const url = googleSearchUrl(this.search)
        chrome.tabs.getCurrent(tab => chrome.tabs.update(tab.id, { url }))
      }
    }
  }
</script>