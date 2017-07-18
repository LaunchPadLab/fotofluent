import Vue from 'vue'
import Vuex from 'vuex'
import ChromePromise from 'chrome-promise'

Vue.use(Vuex)
const chromep = new ChromePromise()

export const LANGUAGES = [
  { key: 'GERMAN', value: 'GER' },
  { key: 'SPANISH', value: 'SPA' }
]

const store = new Vuex.Store({
  state: {
    language: 'GER',
  },

  actions: {
    async HYDRATE_STATE ({ commit }) {
      const items = await chromep.storage.local.get([
        'language'
      ])
      commit('SET_LANGUAGE', items.language || 'GER')
    }
  },

  mutations: {
    SET_LANGUAGE (state, language) {
      state.language = language
      chromep.storage.local.set({ language })
    }
  }
})

//
// Hydrate on app start.
//
const hydrate = async () => {
  await store.dispatch('HYDRATE_STATE')
}
hydrate()

export default store