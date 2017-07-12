/* eslint-disable no-unused-vars */

import 'babel-polyfill'
import Vue from 'vue'
import Tab from '../components/tab.vue'
import AsyncComputed from 'vue-async-computed'

Vue.use(AsyncComputed)

const translationsUrl = 'https://fotofluent-admin.herokuapp.com/transaltions.json'

const app = new Vue({
  el: '#app',
  render (h) {
    return (
      <Tab />
    )
  }
})
