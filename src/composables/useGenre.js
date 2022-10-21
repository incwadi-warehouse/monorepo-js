import { onMounted, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

export function useGenre() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const genres = ref([])

  const list = () => {
    return request('get', '/api/genre/').then((res) => {
      genres.value = res.data
    })
  }

  onMounted(list)

  return {
    genres,
  }
}
