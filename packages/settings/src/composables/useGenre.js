import { onMounted, reactive, ref } from 'vue'
import { useRequest } from '@/composables/useRequest'
import Cookies from 'js-cookie'

export function useGenre() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const base = '/api/genre'

  const state = reactive({
    genres: [],
  })

  const genre = ref('')

  const set = (data) => {
    genre.value = data
  }

  const list = () => {
    return request('get', base + '/').then((response) => {
      state.genres = response.data
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
    genre,
    create,
    update,
    remove,
    set,
  }
}
