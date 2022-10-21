import { computed, onMounted, reactive } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

export function useInventory() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const base = '/api/inventory'

  const state = reactive({
    inventories: [],
    hasActiveInventory: computed(() => {
      let active = false
      state.inventories.forEach((element) => {
        if (null === element.endedAt) {
          active = true
        }
      })
      return active
    }),
  })

  const listInventories = () => {
    return request('get', base + '/').then((response) => {
      state.inventories = response.data
    })
  }

  onMounted(listInventories)

  const create = () => {
    return request('post', base + '/new').then(() => {
      listInventories()
    })
  }

  const end = (id) => {
    const endedAt = Date.now() / 1000

    return request('put', base + '/' + id, { endedAt }).then(() => {
      listInventories()
    })
  }

  return { state, create, end }
}
