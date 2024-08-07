import { onMounted, reactive } from 'vue'
import useAuth from '@/composables/useAuth.js'

const filter = reactive({
  term: null,
  branch: null,
  genre: [],
  releaseYear: '',
  availability: [],
  format: [],
  added: '',
  duplicate: 'all',
  orderBy: null,
  orderByDirection: 'asc',
  limit: 50,
})

export function useFilter() {
  const auth = useAuth()

  const init = (query, props) => {
    filter.term = query.value.term || null
    filter.branch =
      query.value.branch || props.auth?.state.me?.branch.id || null
    filter.genre = query.value.genre || []
    filter.releaseYear = query.value.releaseYear || ''
    filter.availability = filter.availability = query.value.availability || []
    filter.format = query.value.format || []
    filter.added = query.value.added || undefined
    filter.duplicate = query.value.duplicate || 'all'
    filter.orderBy = query.value.orderBy || null
    filter.orderByDirection = query.value.orderByDirection || 'asc'
    filter.limit = query.value.limit || 50
  }

  const reset = () => {
    filter.term = null
    filter.branch = auth.state.me.branch.id
    filter.genre = []
    filter.releaseYear = ''
    filter.availability = []
    filter.format = []
    filter.added = ''
    filter.duplicate = 'all'
    filter.orderBy = null
    filter.orderByDirection = null
    filter.limit = 50
  }

  onMounted(() => {
    auth.me().then(() => {
      filter.branch = auth.state.me.branch.id
    })
  })

  return { filter, init, reset }
}
