<template lang="pug">
  .columns.is-multiline
    .column.is-3(v-for="(product, i) of products" :key="i")
      .card
        .card-image
          figure.image
            img(:src="product.image" alt="")
        .card-content
          .content
            h2 {{ product.name }}
            .tags.has-addons.is-medium
              span.tag.is-dark ราคา
              span.tag.is-link {{ Number(product.price).toLocaleString() }}
            p {{ product.describe }}
        .card-footer
          RouterLink.card-footer-item(:to="`/products/${product.id}`") ดูสินค้า
          a.card-footer-item(@click="onAddToCart(i)") หยิบใส่ตระกร้า
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    onAddToCart (index) {
      this.$store.commit('cart/addCart', this.products[index])
    }
  },
  async mounted () {
    try {
      const response = await axios.get('/api/products')
      this.products = response.data.data
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
