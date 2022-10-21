import { computed, onMounted, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

export function useInventory() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const inventories = ref([])

  const hasActiveInventory = computed(() => {
    let active = false
    inventories.value.forEach((element) => {
      if (element.endedAt === null) {
        active = true
      }
    })

    return active
  })

  const listInventories = () => {
    return request('get', '/api/inventory/').then((res) => {
      inventories.value = res.data
    })
  }

  onMounted(listInventories)

  return { hasActiveInventory }
}
