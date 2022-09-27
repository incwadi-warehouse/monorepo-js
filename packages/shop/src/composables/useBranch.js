import { onMounted, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'

const branch = ref(null)

export function useBranch() {
  const { config, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API

  const show = () => {
    return request(
      'get',
      '/api/public/branch/show/' + import.meta.env.VUE_APP_BRANCH
    ).then((res) => {
      branch.value = res.data
    })
  }

  onMounted(show)

  return {
    branch,
  }
}
