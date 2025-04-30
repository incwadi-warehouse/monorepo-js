import { onMounted, ref } from 'vue'
import { useRequest } from '@/composables/useRequest'

export function useGenre() {
  const {  request } = useRequest({ baseURL: import.meta.env.VITE_API })

  const genres = ref(null)

  const list = () => {
    return request(
      'get',
      '/api/public/genre/' + import.meta.env.VITE_BRANCH
    ).then((res) => {
      genres.value = res.data
    })
  }

  onMounted(list)

  return {
    genres,
  }
}
