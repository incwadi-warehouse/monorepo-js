import { onMounted, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'

export function useRecommendation() {
  const { config, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API

  const branch = import.meta.env.VUE_APP_BRANCH

  const recommendations = ref([])

  const list = () => {
    return request('get', '/api/public/book/recommendation/' + branch).then(
      (res) => {
        recommendations.value = res.data.books
      }
    )
  }

  onMounted(list)

  return { recommendations }
}
