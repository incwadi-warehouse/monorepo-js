import { onMounted, ref } from 'vue'
import { remove as _remove } from 'lodash'

const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

export function useCart() {
  const list = () => {
    cart.value = JSON.parse(localStorage.getItem('cart')) || []
  }

  onMounted(list)

  const save = (books) => {
    localStorage.setItem('cart', JSON.stringify(books))
  }

  const add = ({ id, title, price }) => {
    cart.value.push({ id, title, price })
    save(cart.value)
  }

  const remove = (book) => {
    cart.value = _remove(cart.value, (item) => {
      return item !== book
    })

    save(cart.value)

    if (cart.value.length === 0) {
      localStorage.removeItem('cart')
      cart.value = []
    }
  }

  const clean = () => {
    localStorage.removeItem('cart')
    cart.value = []
  }

  return { cart, add, remove, clean }
}
