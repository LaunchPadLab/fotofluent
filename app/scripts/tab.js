/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Tab from '../component/tab.vue'
import AsyncComputed from 'vue-async-computed'

Vue.use(AsyncComputed)

const app = new Vue({
  el: '#app',
  render (h) {
    return (
      <Tab />
    )
  }
})
