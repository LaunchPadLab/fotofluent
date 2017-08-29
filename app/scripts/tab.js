/* eslint-disable no-unused-vars */

import 'babel-polyfill'
import Vue from 'vue'
import store from '../store/index.js'
import Tab from '../components/tab.vue'
import AsyncComputed from 'vue-async-computed'
import VTooltip from 'v-tooltip'

Vue.use(AsyncComputed)
Vue.use(VTooltip)

const app = new Vue({
  el: '#app',
  store,
  render (h) {
    return <Tab />
  }
})
