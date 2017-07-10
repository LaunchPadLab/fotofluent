/* eslint-disable no-unused-vars */
import 'babel-polyfill'
import Vue from 'vue'
import Options from '../components/options.vue'

const app = new Vue({
  el: '#app',
  render (h) {
    return (
      <Options />
    )
  }
})
