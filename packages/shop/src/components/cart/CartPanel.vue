<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useCart } from '@/composables/useCart.js'
import CartEmpty from '@/components/cart/CartEmpty.vue'
import CartList from '@/components/cart/CartList.vue'
import CartCheckout from '@/components/cart/CartCheckout.vue'
import CartThanks from '@/components/cart/CartThanks.vue'

const emit = defineEmits(['update:visible'])

const isVisible = ref(false)

const step = ref(1)

const handleClose = () => {
  isVisible.value = false
  step.value = 1
}

const { add: addCart, isCartEmpty } = useCart()
addCart({ id: 1, title: "book", price: 1 })
addCart({ id: 1, title: "book", price: 1 })

const handleKeyDown = (event) => {
  if (event.altKey && event.code === 'KeyC') {
    isVisible.value = !isVisible.value
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <BPanel visible position="right" v-if="isVisible" @close="handleClose">
    <BContainer size="m">
      <h2>{{ $t('cart') }}</h2>
    </BContainer>

    <CartEmpty v-if="isCartEmpty && step == 1" @close="handleClose" />

    <CartList v-if="!isCartEmpty && step == 1" @nextStep="step = 2" />

    <CartCheckout v-if="step == 2" @prevStep="step = 1" @nextStep="step = 3" />

    <CartThanks v-if="step == 3" @close="handleClose" />
  </BPanel>
</template>
