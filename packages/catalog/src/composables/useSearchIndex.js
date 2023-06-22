import { useRequest } from 'shared'
import { reactive, ref, watch } from 'vue'
import Cookies from 'js-cookie'
import { useBook } from '@/composables/useBook.js'

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
  setAuthHeader(Cookies.get('token'))

  // @fix delay search, respond to q
  const find = async (branchId) => {
    results.value = await request(
      'post',
      '/indexes/products_' + branchId + '/search',
      query
    )
  }

  watch(() => query.filter, find)

  watch(
    () => query.limit,
    () => {
      query.limit = parseInt(query.limit)
      find()
    }
  )

  const { find: findBooks, books } = useBook()

  const rebuildIndex = async (branch) => {
    await findBooks({
      options: { branch: branch, genre: [], availability: [], limit: 10000 },
    })

    const flattened = []
    books.value.books.forEach((el) => {
      flattened.push({
        id: el.id,
        title: el.title,
        authorFirstname: el.author.firstname,
        authorSurname: el.author.surname,
        genre: el.genre.name,
        price: el.price,
        currency: el.branch.currency,
      })
    })

    await request('post', '/indexes/products_' + branch + '/rebuild', flattened)
  }

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
    rebuildIndex,
  }
}
