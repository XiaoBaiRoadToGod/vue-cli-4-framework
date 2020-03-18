
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    setToken(state, data) {
      state.token = data
    }
  },
  actions: {
    login({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        if (data) {
          console.log(data)
          commit('setToken', data)
          resolve(state)
        } else {
          reject()
        }
      })
    }
  },
  getters: {
    token(state) {
      return state.token
    }
  }
}
