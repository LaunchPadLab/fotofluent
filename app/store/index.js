import Vue from 'vue'
import Vuex from 'vuex'
import ChromePromise from 'chrome-promise'
import axios from 'axios'
import _ from 'lodash'

Vue.use(Vuex)
const chromep = new ChromePromise()

export const LANGUAGES = [
  { key: 'GERMAN', value: 'GER' },
  { key: 'SPANISH', value: 'SPA' },
  { key: 'ITALIAN', value: 'ITA' },
  { key: 'FRENCH', value: 'FRA' },
]

const TRANSLATIONS_ENDPOINT = 'https://fotofluent-admin.herokuapp.com/translations.json'

const store = new Vuex.Store({
  state: {
    language: 'GER',
    topSites: [],
    translation: {},
  },

  actions: {
    async HYDRATE_STATE ({ commit }) {
      console.log(`action: call hydrate state`)
      const items = await chromep.storage.local.get([
        'language',
        'topSites',
        'translation',
      ])
      console.log('items log', items.language)
      commit('SET_LANGUAGE', items.language || 'GER')
      commit('SET_TOP_SITES', items.topSites)
      commit('SET_TRANSLATION', items.translation)
    },
    async REQUEST_DATA ({ commit }) {
      console.log(`action: requesting data with ${store.state.language}`)
      try {
        const response = await axios.get(`${TRANSLATIONS_ENDPOINT}?lang=${store.state.language}`)
        const translation = _.sample(response.data)
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
      console.log(`mutation: setting language to ${language}`)
      state.language = language
      chromep.storage.local.set({ language })
    },
    SET_TOP_SITES (state, topSites) {
      state.topSites = topSites
      chromep.storage.local.set({ topSites })
    },
    SET_TRANSLATION (state, translation) {
      console.log(`mutation: setting translation`)
      console.log(translation)
      state.translation = translation
    },
  }
})

//
// Hydrate on app start.
//
const hydrate = async () => {
  console.log('initial app hydrate')
  await store.dispatch('HYDRATE_STATE')
}
hydrate()

//
// Hydrate whenever chrome state changes
//
const bindListeners = async () => {
  console.log(`bindListeners: rehydrating state due to state change`)
  chrome.storage.onChanged.addListener(() => {
    store.dispatch('HYDRATE_STATE')
  })
}
bindListeners()

export default store
