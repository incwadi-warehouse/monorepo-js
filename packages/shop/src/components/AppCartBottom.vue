<script setup>
import { useCart } from '@/composables/useCart.js'

const { cart } = useCart()
</script>

<template>
  <div class="cart" v-if="cart.length >= 1">
    <div class="cart_cta">
      <BIcon
        type="cart"
        color="#ffffff"
        size="20"
        :style="{ marginRight: '10px' }"
        no-hover
      />{{ $t('cart') }} ({{ cart.length }})
    </div>
  </div>
</template>

<style scoped>
.cart {
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid var(--color-neutral-02);
  width: 100%;
}
.cart_cta {
  display: flex;
  justify-content: center;
  background: var(--color-primary-05);
  border-radius: 20px;
  margin: 10px;
  padding: 10px 20px;
  color: var(--color-neutral-00);
  font-size: 1.1rem;
  text-align: center;
  cursor: pointer;
}
</style>
