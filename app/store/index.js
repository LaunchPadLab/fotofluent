import Vue from 'vue'
import Vuex from 'vuex'
import ChromePromise from 'chrome-promise'
import axios from 'axios'
import { sample } from '../lib/utils.js'

Vue.use(Vuex)
const chromep = new ChromePromise()

export const LANGUAGES = [
  { key: 'GERMAN', value: 'GER' },
  { key: 'SPANISH', value: 'SPA' }
]

const store = new Vuex.Store({
  state: {
    language: 'GER',
    topSites: [],
    translation: {},
  },

  actions: {
    async HYDRATE_STATE ({ commit }) {
      const items = await chromep.storage.local.get([
        'language',
        'topSites',
        'translation',
      ])
      commit('SET_LANGUAGE', items.language)
      commit('SET_TOP_SITES', items.topSites)
      commit('SET_TRANSLATION', items.translation)
    },
    async REQUEST_DATA ({ commit }) {
      try {
        const response = await axios.get(`https://fotofluent-admin.herokuapp.com/translations.json`)
        const translation = sample(response.data)
        commit('SET_TRANSLATION', translation)
        document.body.style.backgroundImage = `url(${translation.word.image})`
      } catch (err) {
        console.log(err)
      }
    },
    async REQUEST_TOP_SITES ({ commit }) {
      const mostVisitedUrls = await chromep.topSites.get()
      commit('SET_TOP_SITES', mostVisitedUrls.slice(0, 5))
    },
  },

  mutations: {
    SET_LANGUAGE (state, language) {
      state.language = language
      chromep.storage.local.set({ language })
    },
    SET_TOP_SITES (state, topSites) {
      state.topSites = topSites
      chromep.storage.local.set({ topSites })
    },
    SET_TRANSLATION (state, translation) {
      state.translation = translation
    },
  },

  getters: {
    selectedLanguage: state => state.language
  },
})

//
// Hydrate on app start.
//
const hydrate = async () => {
  await store.dispatch('HYDRATE_STATE')
}
hydrate()

//
// Hydrate whenever chrome state changes
//
const bindListeners = async () => {
  chrome.storage.onChanged.addListener(() => {
    store.dispatch('HYDRATE_STATE')
  })
}
bindListeners()

export default store
