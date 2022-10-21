import { reactive } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

export function useBranch() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const base = '/api/branch'

  const state = reactive({
    branches: [],
    branch: null,
    hasSuccess: false,
    hasError: false,
  })

  const list = () => {
    return request('get', base + '/').then((res) => {
      state.branches = res.data
    })
  }

  const show = (id) => {
    return request('get', base + '/' + id).then((response) => {
      state.branch = response.data
    })
  }

  const create = (data) => {
    request('post', base + '/new', data)
  }

  const update = (data) => {
    return request('put', base + '/' + data.id, data.params)
      .then(() => {
        state.hasSuccess = true
      })
      .catch(() => {
        state.hasError = true
      })
  }

  const clean = () => {
    return request('delete', '/api/book/clean')
  }

  return {
    state,
    list,
    show,
    create,
    update,
    clean,
  }
}
