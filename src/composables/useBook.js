import { ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

export function useBook() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const stats = ref(null)

  const getStats = () => {
    request('get', '/api/book/stats').then((response) => {
      stats.value = response.data
    })
  }

  return {
    stats,
    getStats,
  }
}
