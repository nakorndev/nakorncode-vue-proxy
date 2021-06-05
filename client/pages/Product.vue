<template lang="pug">
  #product
    img.image(:src="product.image")
    h1.title {{ product.name }}
    a.button.is-link(@click="onAddToCart") หยิบใส่ตระกร้า
    .content
      ul
        li {{ product.describe }}
        li ราคา {{ Number(product.price).toLocaleString() }} บาท
        li {{ Number(product.price).toLocaleString() }} บาท
        li {{ product.tags }}
        li สร้างเมื่อ {{ product.createdAt }}
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    onAddToCart () {
      this.$store.commit('cart/addCart', this.product)
    }
  },
  async mounted () {
    // vue router
    // this.$route
      // - .query
      // - .params
    // this.$router
      // - .push()
      // - .replace()
    try {
      const response = await axios.get(`/api/products/${this.$route.params.id}`)
      this.product = response.data.data
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
