import { useRequest } from 'shared'
import { onMounted, ref } from 'vue'
import { useBook } from '@/composables/useBook.js'

const token = ref(localStorage.getItem('search_api_token') || '')

export function useSearchIndexSettings() {
  const { localConfig, request, setAuthHeader } = useRequest()

  localConfig.value.baseURL = import.meta.env.VUE_APP_SEARCH_API
  localConfig.value.headers['Content-Type'] = 'application/json'
  setAuthHeader(token.value)

  const indexes = ref([])
  const fetchIndexes = async () => {
    indexes.value = await request('get', '/indexes')
  }

  onMounted(fetchIndexes)

  const indexName = ref('')

  const createIndex = () => {
    request('post', '/indexes', {
      uid: indexName.value,
      primaryKey: 'id',
    }).then(() => {
      indexName.value = ''
      setTimeout(fetchIndexes, 2000)
    })
  }

  const removeIndex = (id) => {
    request('delete', '/indexes/' + id).then(() => {
      setTimeout(fetchIndexes, 2000)
    })
  }

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

    await request('post', '/indexes/books/documents', flattened)
  }

  const settings = ref({})

  const fetchSettings = async () => {
    settings.value = JSON.stringify(
      await request('get', '/indexes/books/settings')
    )
  }

  onMounted(fetchSettings)

  const saveSettings = () => {
    request('patch', '/indexes/books/settings', JSON.parse(settings.value))
  }

  const rebuildIndex = async (branch) => {
    await request(
      'delete',
      '/indexes/books/documents',
      JSON.parse(settings.value)
    )
    addDocument(branch)
  }

  return {
    indexes,
    indexName,
    createIndex,
    removeIndex,
    addDocument,
    settings,
    saveSettings,
    rebuildIndex,
  }
}
