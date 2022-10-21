import { onMounted, reactive } from 'vue'
import useAuth from '@/composables/useAuth.js'

const filter = reactive({
  term: null,
  branch: null,
  genre: [],
  releaseYear: '',
  availability: [],
  format: null,
  added: '',
  orderBy: null,
  orderByDirection: 'asc',
  limit: 50,
})

export function useFilter() {
  const init = (query, props) => {
    filter.term = query.value.term || null
    filter.branch =
      query.value.branch || props.auth?.state.me?.branch.id || null
    filter.genre = query.value.genre || []
    filter.releaseYear = query.value.releaseYear || ''
    filter.availability = filter.availability = query.value.availability || []
    filter.format = query.value.format || null
    filter.added = query.value.added || ''
    filter.orderBy = query.value.orderBy || null
    filter.orderByDirection = query.value.orderByDirection || 'asc'
    filter.limit = query.value.limit || 50
  }

  const reset = () => {
    filter.term = null
    filter.branch = null
    filter.genre = []
    filter.releaseYear = ''
    filter.availability = []
    filter.format = null
    filter.added = ''
    filter.orderBy = null
    filter.orderByDirection = null
    filter.limit = 50
  }

  onMounted(() => {
    const auth = useAuth()
    auth.me().then(() => {
      filter.branch = auth.state.me.branch.id
    })
  })

  return { filter, init, reset }
}
