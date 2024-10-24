<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useCart } from '@/composables/useCart.js'
import CartList from '@/components/cart/CartList.vue'
import CartCheckout from '@/components/cart/CartCheckout.vue'
import CartThanks from '@/components/cart/CartThanks.vue'

const emit = defineEmits(['update:visible'])

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const step = ref(1)

const handleClose = () => {
  emit('update:visible', false)
  step.value = 1
}

const { add: addCart } = useCart()

const handleKeyDown = (event) => {
  if (event.altKey && event.code === 'KeyC') {
    emit('update:visible', !props.visible)
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
  <portal to="body">
    <BPanel :visible="visible" position="right" @close="handleClose" width="500px">
      <BContainer size="m">
        <h2>{{ $t('cart') }}</h2>
      </BContainer>

      <CartList v-if="step === 1" @nextStep="step = 2" @close="handleClose" />

      <CartCheckout v-if="step === 2" @prevStep="step = 1" @nextStep="step = 3" />

      <CartThanks v-if="step === 3" @close="handleClose" />
    </BPanel>
  </portal>
</template>
