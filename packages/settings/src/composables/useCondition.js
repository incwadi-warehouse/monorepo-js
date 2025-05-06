import { onMounted, reactive, ref } from 'vue'
import { useRequest } from '@/composables/useRequest'
import Cookies from 'js-cookie'

export function useCondition() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const base = '/api/condition'

  const state = reactive({
    conditions: [],
  })

  const condition = ref('')

  const set = (data) => {
    condition.value = data
  }

  const list = () => {
    return request('get', base + '/').then((response) => {
      state.conditions = response.data
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
    condition,
    create,
    update,
    remove,
    set,
  }
}
