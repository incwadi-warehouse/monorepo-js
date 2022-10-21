import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

export function useTag() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const create = (data) => {
    return request('post', '/api/tag/new', data)
  }

  const remove = (id) => {
    return request('delete', '/api/tag/' + id)
  }

  return { create, remove }
}
