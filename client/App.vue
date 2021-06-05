<template lang="pug">
  #vue
    nav.navbar.is-dark
      .navbar-brand
        RouterLink.navbar-item(to="/") สินค้าทั้งหมด
        RouterLink.navbar-item(to="/cart") ตระกร้า ({{ $store.state.cart.cart.length }})
        RouterLink.navbar-item(v-if="!$store.state.auth.data" to="/login") เข้าสู่ระบบ
        //- router-link
    .section
      .container
        RouterView
        //- router-view
</template>

<script>
import axios from 'axios'

export default {
  async mounted () {
    try {
      const response = await axios.get('/api/login')
      this.$store.commit('auth/setAuth', response.data.auth)
    } catch (error) {
      console.warn('ไม่พบการเข้าสู่ระบบ')
    }
  }
}
</script>
