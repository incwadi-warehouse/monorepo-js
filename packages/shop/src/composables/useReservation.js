import { ref } from 'vue'
import { useRequest } from '@/composables/useRequest'
import { useCart } from './useCart.js'

export function useReservation() {
  const { request } = useRequest({ baseURL: import.meta.env.VITE_API })

  const { cart } = useCart()

  const reservation = ref({
    books: null,
    notes: null,
    salutation: null,
    firstname: null,
    surname: null,
    mail: null,
    phone: null,
  })

  const isCreating = ref(false)

  const create = () => {
    isCreating.value = true

    return request('post', '/api/public/reservation/new', {
      books: reservation.value.books,
      notes: reservation.value.notes,
      salutation: reservation.value.salutation,
      firstname: reservation.value.firstname,
      surname: reservation.value.surname,
      mail: reservation.value.mail,
      phone: reservation.value.phone,
    })
      .then(() => {
        reservation.value = []
        cart.value = []
      })
      .finally(() => {
        isCreating.value = false
      })
  }

  return {
    reservation,
    isCreating,
    create,
  }
}
