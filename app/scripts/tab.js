/* eslint-disable no-unused-vars */

import 'babel-polyfill'
import Vue from 'vue'
import store from '../store/index.js'
import Tab from '../components/tab.vue'
import AsyncComputed from 'vue-async-computed'

Vue.use(AsyncComputed)

const app = new Vue({
  el: '#app',
  store,
  render (h) {
    return (
      <Tab />
    )
  }
})
