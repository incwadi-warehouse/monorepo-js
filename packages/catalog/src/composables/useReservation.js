import { onMounted, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'
import { useCart } from './useCart.js'

export function useReservation() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const { clean } = useCart()
  const reservations = ref(null)
  const reservation = ref(null)
  const isLoading = ref(false)
  const counter = ref(null)

  const list = () => {
    isLoading.value = true

    return request('get', '/api/reservation/list').then((res) => {
      reservations.value = res.data
      isLoading.value = false
    })
  }

  onMounted(list)

  const status = () => {
    return request('get', '/api/reservation/status').then((res) => {
      counter.value = res.data
    })
  }

  onMounted(status)

  const create = (data) => {
    return request('post', '/api/reservation/new', data)
      .then(() => {
        clean()
      })
      .then(() => {
        list()
      })
  }

  const update = (data) => {
    return request('put', '/api/reservation/' + data.id, {
      collection: data.collection,
      notes: data.notes,
      books: data.books,
      salutation: data.salutation,
      firstname: data.firstname,
      surname: data.surname,
      mail: data.mail,
      phone: data.phone,
    })
  }

  const remove = (id) => {
    return request('delete', '/api/reservation/' + id).then(() => {
      list()
    })
  }

  return {
    reservations,
    reservation,
    isLoading,
    counter,
    list,
    status,
    remove,
    create,
    update,
  }
}
