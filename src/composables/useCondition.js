import { onMounted, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

export function useCondition() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const conditions = ref([])

  const list = () => {
    return request('get', '/api/condition/').then((res) => {
      conditions.value = res.data
    })
  }

  onMounted(list)

  return {
    conditions,
  }
}
