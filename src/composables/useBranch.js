import { onMounted, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

export function useBranch() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const branches = ref([])

  const list = () => {
    return request('get', '/api/branch/').then((res) => {
      branches.value = res.data
    })
  }

  onMounted(list)

  return {
    branches,
  }
}
