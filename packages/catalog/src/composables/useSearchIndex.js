import { useRequest } from 'shared'
import { reactive, ref, watch } from 'vue'

const token = ref(localStorage.getItem('search_api_token') || '')

const defaultQuery = {
  q: '',
  limit: 20,
  filter: [],
  facets: ['genre'],
}

const query = reactive(defaultQuery)

const results = ref([])

export function useSearchIndex() {
  const { localConfig, request, setAuthHeader } = useRequest()

  localConfig.value.baseURL = import.meta.env.VUE_APP_SEARCH_API
  localConfig.value.headers['Content-Type'] = 'application/json'
  setAuthHeader(token.value)

  // @fix delay search, respond to q
  const find = async () => {
    results.value = await request('post', '/indexes/books/search', query)
  }

  watch(() => query.filter, find)

  watch(
    () => query.limit,
    () => {
      query.limit = parseInt(query.limit)
      find()
    }
  )

  // @fix this is too complex when there are more filters like that
  const setGenreFilter = (genre) => {
    query.filter = ['genre="' + genre + '"']
  }

  // @fix this is too complex when there are more filters like that
  const removeGenreFilter = () => {
    query.filter = []
  }

  const formatPrice = (data) => {
    return Number.parseFloat(data).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const formatAuthor = (firstname, surname) => {
    if ('' === firstname) {
      return surname
    }

    return surname + ', ' + firstname
  }

  return {
    query,
    results,
    find,
    setGenreFilter,
    removeGenreFilter,
    formatPrice,
    formatAuthor,
  }
}