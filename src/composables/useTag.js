import { onMounted, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

const tags = ref([])

export function useTag() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const tag = ref(null)

  const set = (data) => {
    tag.value = data
  }

  const list = () => {
    return request('get', '/api/tag/').then((res) => {
      tags.value = res.data
    })
  }

  onMounted(list)

  const create = () => {
    return request('post', '/api/tag/new', { name: tag.value }).then(() => {
      list()
      tag.value = null
    })
  }

  const update = () => {
    return request('put', '/api/tag/' + tag.value.id, {
      name: tag.value.name,
    }).then(() => {
      list()
    })
  }

  const remove = () => {
    return request('delete', '/api/tag' + '/' + tag.value.id).then(() => {
      list()
    })
  }

  return {
    tags,
    tag,
    create,
    update,
    remove,
    set,
  }
}
