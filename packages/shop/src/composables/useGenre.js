import { onMounted, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'

export function useGenre() {
  const { request } = useRequest()

  const genres = ref(null)

  const list = () => {
    return request(
      'get',
      '/api/public/genre/' + import.meta.env.VUE_APP_BRANCH
    ).then((res) => {
      genres.value = res.data
    })
  }

  onMounted(list)

  return {
    genres,
  }
}
