import { useRequest } from 'shared'
import { onMounted, ref } from 'vue'
import Cookies from 'js-cookie'
import { useBook } from '@/composables/useBook.js'

export function useSearchIndexSettings() {
  const { localConfig, request, setAuthHeader } = useRequest()

  localConfig.value.baseURL = import.meta.env.VUE_APP_SEARCH_API
  setAuthHeader(Cookies.get('token'))

  const { find: findBooks, books } = useBook()

  const addDocument = async (branch) => {
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

    await request('post', '/indexes/products_1/documents', flattened)
  }

  const settings = ref({})

  const fetchSettings = async () => {
    settings.value = JSON.stringify(
      await request('get', '/indexes/products_1/settings')
    )
  }

  onMounted(fetchSettings)

  const saveSettings = () => {
    request('patch', '/indexes/products_1/settings', JSON.parse(settings.value))
  }

  const rebuildIndex = async (branch) => {
    await request(
      'delete',
      '/indexes/products_1/documents',
      JSON.parse(settings.value)
    )
    addDocument(branch)
  }

  return {
    addDocument,
    settings,
    saveSettings,
    rebuildIndex,
  }
}
