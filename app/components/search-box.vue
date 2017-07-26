<template>
  <form action="?" @submit="onSearch" v-on:submit.prevent="onSearch">
    <input type="text" v-model="search" />
    <button style="display:none;" type="submit">Search</button>
  </form>
</template>

<script>
  export default {
    name: 'search-box',
    
    data () {
      return {
        search: '',
      }
    },

    methods: {
      onSearch (e) {
        const baseUrl = "https://google.com/search?q="
        const newUrl = `${baseUrl}${this.search}`
        chrome.tabs.getCurrent(tab => chrome.tabs.update(tab.id, { url: newUrl }))
      }
    }
  }
</script>