import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

export function useProduct() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const removeFromOrder = (id) => {
    show(id).then((res) => {
      let tags = []
      res.data.tags.forEach((element) => {
        tags.push(element.id)
      })

      const product = {}

      product.added = res.data.added
      product.title = res.data.title
      product.shortDescription = res.data.shortDescription
      product.author = res.data.author.surname + ',' + res.data.author.firstname
      product.genre = res.data.genre.id
      product.price = res.data.price
      product.sold = res.data.sold
      product.removed = res.data.removed
      product.reserved = false
      product.releaseYear =
        res.data.releaseYear !== '' ? res.data.releaseYear : 0
      product.cond = res.data.cond
      product.tags = tags
      product.recommendation = res.data.recommendation
      product.format = res.data.format.id
      product.subtitle = res.data.subtitle

      update(id, product)
    })
  }

  const show = (id) => {
    return request('get', '/api/book/' + id)
  }

  const update = (id, data) => {
    return request('put', '/api/book/' + id, data)
  }

  return { removeFromOrder }
}
