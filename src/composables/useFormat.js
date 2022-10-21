import { onMounted, reactive, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

export function useFormat() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const base = '/api/format'

  const state = reactive({
    formats: [],
  })

  const format = ref('')

  const set = (data) => {
    format.value = data
  }

  const list = () => {
    return request('get', base + '/').then((response) => {
      state.formats = response.data
    })
  }

  onMounted(list)

  const create = (data) => {
    return request('post', base + '/new', { name: data }).then(() => {
      list()
    })
  }

  const update = (data) => {
    return request('put', base + '/' + data.id, { name: data.name }).catch(
      () => {
        list()
      }
    )
  }

  const remove = (data) => {
    return request('delete', base + '/' + data.id).then(() => {
      list()
    })
  }

  return {
    state,
    format,
    create,
    update,
    remove,
    set,
  }
}
