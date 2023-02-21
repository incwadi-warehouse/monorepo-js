import { ref } from 'vue'
import { useRequest, useToast } from '@baldeweg/ui'
import Cookies from 'js-cookie'
import { useI18n } from 'vue-i18n'

const orders = ref(null)

export function useOrder() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const { add } = useToast()

  const { t } = useI18n()

  const order = ref(null)

  const isLoading = ref(false)

  const list = () => {
    isLoading.value = true

    return request('get', '/api/reservation/list').then((res) => {
      orders.value = res.data
      isLoading.value = false
    })
  }

  const show = (id) => {
    return request('get', '/api/reservation/' + id).then((res) => {
      order.value = res.data
    })
  }

  const update = () => {
    return request('put', '/api/reservation/' + order.value.id, {
      notes: order.value.notes,
      books: flatten(order.value.books),
      salutation: order.value.salutation,
      firstname: order.value.firstname,
      surname: order.value.surname,
      mail: order.value.mail,
      phone: order.value.phone,
      open: order.value.open,
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
    let products = []

    data.forEach((element) => {
      products.push(element.id)
    })

    return products.join(',')
  }

  return {
    orders,
    order,
    isLoading,
    list,
    show,
    update,
    remove,
    toLocaleDateString,
  }
}
