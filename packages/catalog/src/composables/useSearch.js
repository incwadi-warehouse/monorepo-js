import { useAuthor } from '@/composables/useAuthor.js'
import { useBook } from '@/composables/useBook.js'
import { useFilter } from './../composables/useFilter.js'
import { useRouter } from 'vue-router'
import { toRefs, ref, onMounted, watchEffect } from 'vue'
import { isEmpty } from 'lodash'

export function useSearch(props) {
  const router = useRouter()

  const { query, id } = toRefs(props)

  const modal = ref(null)

  const { filter, init: initFilter } = useFilter()

  initFilter(query, props)

  const { find: findAuthor } = useAuthor()

  const { find: findBook } = useBook()

  onMounted(() => {
    if (!isEmpty(query.value)) {
      router.push({ name: 'search', query: filter })
      if (filter.term !== null) {
        findAuthor({ term: filter.term })
      }
      findBook({ options: filter })
    }
  })

  watchEffect(() => {
    if (id.value) modal.value = 'update'
  })

  return { modal }
}
