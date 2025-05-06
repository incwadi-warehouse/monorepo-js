import { useRequest } from '@/composables/useRequest'
import Cookies from 'js-cookie'

export function useProduct() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const sellAll = (products) => {
    products.forEach((element) => {
      sell(element.id)
    })
  }

  const sell = (id) => {
    return request('put', '/api/book/sell/' + id)
  }

  return {
    sellAll,
  }
}
