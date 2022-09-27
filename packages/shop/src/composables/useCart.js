import { ref, watch } from 'vue'
import { remove as _remove } from 'lodash'

const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

export function useCart() {
  const add = ({ id, title, price }) => {
    cart.value.push({
      id,
      title,
      price,
    })
  }

  const remove = (article) => {
    cart.value = _remove(cart.value, (item) => {
      return item !== article
    })
  }

  watch(
    () => cart.value,
    () => {
      localStorage.setItem('cart', JSON.stringify(cart.value))

      if (cart.value.length === 0) {
        localStorage.removeItem('cart')
      }
    }
  )

  return { cart, add, remove }
}
