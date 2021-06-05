import axios from 'axios'

export default {
  namespaced: true,
  state: {
    cart: []
  },
  mutations: {
    addCart (state, item) {
      const index = _.findIndex(state.cart, { id: item.id })
      if (index >= 0) {
        state.cart[index].count++
      } else {
        state.cart.push({ ...item, count: 1 })
      }
    },
    removeCart (state, id) {
      const index = _.findIndex(state.cart, { id })
      console.log(index)
      state.cart.splice(index, 1)
    },
    increaseProductAtCart (state, id) {
      const index = _.findIndex(state.cart, { id })
      state.cart[index].count++
    },
    decreaseProductAtCart (state, id) {
      const index = _.findIndex(state.cart, { id })
      state.cart[index].count--
    },
    setProductAtCart (state, { id, count }) {
      const index = _.findIndex(state.cart, { id })
      state.cart[index].count = Number(count)
    },
    clearCart (state) {
      state.cart = []
    }
  },
  actions: {
    async checkout (context) {
      // context.commit()
      // context.state
      const response = await axios.post('/api/checkout', {
        cart: context.state.cart
      })
      context.commit('clearCart')
      return response
    }
  }
}
