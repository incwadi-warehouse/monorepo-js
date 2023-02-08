import { ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

const reservations = ref(null)

export function useOrder() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const isLoading = ref(false)

  const list = () => {
    isLoading.value = true

    return request('get', '/api/reservation/list').then((res) => {
      reservations.value = res.data
      isLoading.value = false
    })
  }

  const toLocaleDateString = (data) => {
    let date = new Date(data * 1000)

    return date.toLocaleString()
  }

  return { reservations, isLoading, list, toLocaleDateString }
}
