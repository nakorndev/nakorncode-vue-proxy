<template lang="pug">
  #cart
    .box(v-for="(item, i) of cart" :key="i")
      .level
        .level-item
          img(:src="item.image" style="max-width: 100px;")
        .level-item
          p {{ item.name }}
        .level-item
          .tags.has-addons.is-medium
            span.tag.is-dark ราคา
            span.tag.is-link {{ Number(item.price).toLocaleString() }}
        .level-item
          .field.has-addons
            .control
              a.button.is-danger(@click="decreaseProductAtCart(item.id)") -
            .control
              input.input(
                :value="item.count"
                @input="setProductAtCart({ id: item.id, count: $event.currentTarget.value })"
                type="text"
                style="width: 100px;")
            .control
              a.button.is-success(@click="increaseProductAtCart(item.id)") +
        .level-item
          a.button.is-danger(@click="removeCart(item.id)") ลบ
    .buttons.is-right
      a.button.is-link(@click="onCheckout") ชำระเงิน
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  // data () {
  //   return {
  //     cart: []
  //   }
  // },
  // mounted () {
  //   this.cart = this.$store.state.cart
  // }

  // computed: {
  //   cart () {
  //     return this.$store.state.cart
  //   }
  // }

  computed: mapState('cart', ['cart']),

  // methods: {
  //   onRemoveCart (index) {
  //     this.$store.commit('removeCart', index)
  //   }
  // }

  methods: {
    ...mapMutations('cart', [
      'removeCart',
      'setProductAtCart',
      'increaseProductAtCart',
      'decreaseProductAtCart'
    ]),
    async onCheckout () {
      try {
        const response = await this.$store.dispatch('cart/checkout')
        console.log(response)
        alert('ok')
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        alert('error!')
      }
    }
  }
}
</script>
