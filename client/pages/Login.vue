<template lang="pug">
  .box
    form(@submit.prevent="onSubmit")
      .field
        input.input(v-model="input.username" type="text" required placeholder="Username:")
      .field
        input.input(v-model="input.password" type="password" required placeholder="Password:")
      .field
        button.button.is-link เข้าสู่ระบบ
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      input: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        const response = await axios.post('/api/login', this.input)
        alert('คุณได้เข้าสู่ระบบ')
        this.$store.commit('auth/setAuth', response.data.auth)
        this.$router.push('/')
      } catch (error) {
        alert(error?.response.data.error)
      }
    }
  }
}
</script>
