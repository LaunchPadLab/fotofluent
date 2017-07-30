import Vue from 'vue'
import Vuex from 'vuex'
import ChromePromise from 'chrome-promise'
import axios from 'axios'
import { sample } from '../lib/utils.js'

Vue.use(Vuex)
const chromep = new ChromePromise()

export const LANGUAGES = [
  { key: 'GERMAN', value: 'de-DE' },
  { key: 'SPANISH', value: 'es-ES' },
  { key: 'ITALIAN', value: 'it-IT' },
  { key: 'FRENCH', value: 'fr-FR' },
]

const TRANSLATIONS_ENDPOINT = 'https://fotofluent-admin.herokuapp.com/translations.json'

const store = new Vuex.Store({
  state: {
    language: 'de-DE',
    topSites: [],
    translation: {},
  },

  actions: {
    async HYDRATE_STATE ({ commit, dispatch }) {
      console.log(`action: calling hydrate state`)
      const items = await chromep.storage.local.get([
        'language',
        'topSites',
        'translation',
      ])
      commit('SET_LANGUAGE', items.language)
      commit('SET_TOP_SITES', items.topSites)
      await dispatch('REQUEST_DATA')
    },
    async REQUEST_DATA ({ commit }) {
      console.log(`action: requesting data with ${store.state.language}`)
      try {
        const response = await axios.get(`${TRANSLATIONS_ENDPOINT}?lang=${store.state.language}`)
        const translation = sample(response.data)
        commit('SET_TRANSLATION', translation)
        document.body.style.backgroundImage = `url(${translation.word.image})`
      } catch (err) {
        console.log(err)
      }
    },
    async REQUEST_TOP_SITES ({ commit }) {
      console.log(`action: requesting top sites`)
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
      console.log(`mutation: setting top sites`)
      state.topSites = topSites
      chromep.storage.local.set({ topSites })
    },
    SET_TRANSLATION (state, translation) {
      console.log('mutation: setting translation', translation)
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
  console.log(`app start: initial hydrate`)
  await store.dispatch('HYDRATE_STATE')
  await bindListeners()
  await store.dispatch('REQUEST_DATA')
}
hydrate()

//
// Hydrate whenever chrome state changes
//
const bindListeners = async () => {
  console.log(`bindingListeners called`)
  chrome.storage.onChanged.addListener(() => {
    console.log(`state was updated, will call action to hydrate`)
    store.dispatch('HYDRATE_STATE')
  })
}

export default store
