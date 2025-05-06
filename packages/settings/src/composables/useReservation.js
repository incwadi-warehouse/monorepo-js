import { reactive } from 'vue'
import { useRequest } from '@/composables/useRequest'
import Cookies from 'js-cookie'

export function useReservation() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const base = '/api/reservation'

  const state = reactive({
    reservations: null,
    reservation: null,
    isLoading: false,
  })

  const list = () => {
    state.isLoading = true
    return request('get', base + '/list')
      .then((response) => {
        state.reservations = response.data
      })
      .finally(() => {
        state.isLoading = false
      })
  }

  return {
    state,
    list,
  }
}
