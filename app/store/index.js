import Vue from 'vue'
import Vuex from 'vuex'
import ChromePromise from 'chrome-promise'
import axios from 'axios'
import { sample } from 'utils'

Vue.use(Vuex)
const chromep = new ChromePromise()

export const LANGUAGES = [
  {
    key: 'German',
    value: 'de-DE',
    image: 'https://s3.amazonaws.com/fotofluent/germany.png'
  },
  {
    key: 'Spanish',
    value: 'es-ES',
    image: 'https://s3.amazonaws.com/fotofluent/spain.png'
  },
  {
    key: 'Italian',
    value: 'it-IT',
    image: 'https://s3.amazonaws.com/fotofluent/italy.png'
  },
  {
    key: 'French',
    value: 'fr-FR',
    image: 'https://s3.amazonaws.com/fotofluent/france.png'
  },
]

const TRANSLATIONS_ENDPOINT = 'https://fotofluent-admin.herokuapp.com/translations.json'

const store = new Vuex.Store({
  state: {
    language: 'de-DE',
    topSites: [],
    translation: {},
    showTranslation: false
  },

  actions: {
    async HYDRATE_STATE ({ commit, dispatch }) {
      const items = await chromep.storage.local.get([
        'language',
        'topSites',
        'translation',
      ])
      commit('SET_LANGUAGE', items.language || store.state.language)
      commit('SET_TOP_SITES', items.topSites)
    },
    async REQUEST_DATA ({ commit }) {
      try {
        commit('HIDE_TRANSLATION', false)
        const response = await axios.get(`${TRANSLATIONS_ENDPOINT}?lang=${store.state.language}`)
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
    async UPDATE_LANGUAGE ({ commit, dispatch }, language) {
      await commit('SET_LANGUAGE', language)

      if (language !== store.language) {
        await dispatch('REQUEST_DATA')
      }
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
    TOGGLE_TRANSLATION (state) {
      state.showTranslation = !state.showTranslation
    },
    HIDE_TRANSLATION (state) {
      state.showTranslation = false
    }
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
  await store.dispatch('REQUEST_DATA')
  await bindListeners()
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

export default store
