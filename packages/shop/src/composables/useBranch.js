import { onMounted, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'

const branch = ref(null)

export function useBranch() {
  const {  request } = useRequest({ baseURL: import.meta.env.VITE_API })

  const show = () => {
    return request(
      'get',
      '/api/public/branch/show/' + import.meta.env.VITE_BRANCH
    ).then((res) => {
      branch.value = res.data
    })
  }

  onMounted(show)

  return {
    branch,
  }
}
