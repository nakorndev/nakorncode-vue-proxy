export default {
  namespaced: true,
  state: {
    data: null
  },
  mutations: {
    setAuth (state, obj) {
      state.data = obj
    }
  }
}
