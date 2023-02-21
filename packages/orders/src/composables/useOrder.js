import { ref } from 'vue'
import { useRequest, useToast } from '@baldeweg/ui'
import Cookies from 'js-cookie'
import { useI18n } from 'vue-i18n'

const reservations = ref(null)

export function useOrder() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const { add } = useToast()

  const { t } = useI18n()

  const reservation = ref(null)

  const isLoading = ref(false)

  const list = () => {
    isLoading.value = true

    return request('get', '/api/reservation/list').then((res) => {
      reservations.value = res.data
      isLoading.value = false
    })
  }

  const show = (id) => {
    return request('get', '/api/reservation/' + id).then((res) => {
      reservation.value = res.data
    })
  }

  const update = () => {
    return request('put', '/api/reservation/' + reservation.value.id, {
      notes: reservation.value.notes,
      books: flatten(reservation.value.books),
      salutation: reservation.value.salutation,
      firstname: reservation.value.firstname,
      surname: reservation.value.surname,
      mail: reservation.value.mail,
      phone: reservation.value.phone,
      open: reservation.value.open,
    })
      .then(() => {
        add({
          type: 'success',
          body: t('updated'),
        })
      })
      .catch(() => {
        add({
          type: 'error',
          body: t('error'),
        })
      })
  }

  const remove = (id) => {
    return request('delete', '/api/reservation/' + id).then(() => {
      list()
    })
  }

  const toLocaleDateString = (data) => {
    let date = new Date(data * 1000)

    return date.toLocaleString()
  }

  const flatten = (data) => {
    let books = []

    data.forEach((element) => {
      books.push(element.id)
    })

    return books.join(',')
  }

  return {
    reservations,
    reservation,
    isLoading,
    list,
    show,
    update,
    remove,
    toLocaleDateString,
  }
}
