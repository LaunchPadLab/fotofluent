<template>
  <div>
    <h3>Top Sites</h3>  
    <ul>
      <li v-for="site in topSites"><a :href="site.url">{{ site.title }}</a></li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'top-sites',

    computed: {
      ...mapState([ 'topSites' ])
    }
  }
</script>