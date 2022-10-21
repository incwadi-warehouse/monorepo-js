import { useToast } from '@baldeweg/ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'
import { remove as _remove } from 'lodash'

const authors = ref(null)

const isSearching = ref(false)

const isUpdating = ref(false)

export function useAuthor() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const { t } = useI18n()

  const author = ref(null)

  const { add } = useToast()

  const find = (data) => {
    isSearching.value = true
    return request('get', '/api/author/find', null, data)
      .then((res) => {
        authors.value = res.data
      })
      .finally(() => {
        isSearching.value = false
      })
  }

  const show = (id) => {
    return request('get', '/api/author/' + id).then((res) => {
      author.value = res.data
    })
  }

  const update = (id) => {
    isUpdating.value = true
    return request('put', '/api/author/' + id, {
      firstname: author.value.firstname,
      surname: author.value.surname,
    })
      .then(() => {
        add({
          type: 'success',
          body: t('updated'),
        })
      })
      .catch(() => {
        add({
          type: 'error',
          body: t('error'),
        })
      })
      .finally(() => {
        isUpdating.value = false
      })
  }

  const remove = (id) => {
    return request('delete', '/api/author/' + id).then(() => {
      _remove(authors.value, (el) => {
        return el.id === id
      })
    })
  }

  return {
    authors,
    author,
    isSearching,
    isUpdating,
    find,
    show,
    update,
    remove,
  }
}
