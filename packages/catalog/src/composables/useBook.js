import { useToast } from '@baldeweg/ui'
import { ref } from 'vue'
import { without } from 'lodash'
import { useI18n } from 'vue-i18n'
import { useRequest } from 'shared'
import Cookies from 'js-cookie'

const books = ref(null)

export function useBook() {
  const { localConfig, setAuthHeader, request } = useRequest()

  localConfig.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const { t } = useI18n()

  const { add } = useToast()

  const book = ref(null)
  const cover = ref(null)

  const find = (data) => {
    if (typeof data.options.branch !== 'number') {
      console.error('Missing branch id!')
      return
    }

    return request(
      'get',
      '/api/book' + '/find',
      null,
      {
        options: JSON.stringify(filters(data)),
      },
      true
    ).then((res) => {
      books.value = res.data
    })
  }

  const filters = (data) => {
    return {
      term: data.options.term ?? undefined,
      filter: without(
        [
          data.options.branch
            ? { field: 'branch', operator: 'in', value: data.options.branch }
            : undefined,
          data.options.genre.length != 0
            ? { field: 'genre', operator: 'in', value: data.options.genre }
            : undefined,
          data.options.releaseYear
            ? {
              field: 'releaseYear',
              operator: 'gte',
              value: data.options.releaseYear.split('..')[0],
            }
            : undefined,
          data.options.releaseYear
            ? {
              field: 'releaseYear',
              operator: 'lte',
              value: data.options.releaseYear.split('..')[1],
            }
            : undefined,
          {
            field: 'sold',
            operator: 'eq',
            value: data.options.availability.indexOf('sold') != -1,
          },
          {
            field: 'removed',
            operator: 'eq',
            value: data.options.availability.indexOf('removed') != -1,
          },
          {
            field: 'reserved',
            operator: 'eq',
            value: data.options.availability.indexOf('reserved') != -1,
          },
          data.options.format.length > 0
            ? { field: 'format', operator: 'in', value: data.options.format }
            : undefined,
          data.options.added
            ? {
                field: 'added',
                operator: 'gte',
                value: data.options.added.split('..')[0],
              }
            : undefined,
          data.options.added
            ? {
                field: 'added',
                operator: 'lte',
                value: data.options.added.split('..')[1],
              }
            : undefined,
          ['yes', 'no'].includes(data.options.duplicate)
            ? {
                field: 'duplicate',
                operator: 'eq',
                value: data.options.duplicate === 'yes',
              }
            : undefined,
        ],
        undefined
      ),
      orderBy:
        data.options.orderBy && data.options.orderByDirection
          ? {
              book: [
                {
                  field: data.options.orderBy,
                  direction: data.options.orderByDirection,
                },
              ],
            }
          : undefined,
      limit: data.options.limit,
    }
  }

  const show = (id) => {
    return request('get', '/api/book/' + id, null, null, true).then((res) => {
      book.value = res.data
    })
  }

  const create = (data) => {
    return request('post', '/api/book/new', data, null, true).then((res) => {
      book.value = res.data
    })
  }

  const update = (data) => {
    return request('put', '/api/book/' + data.id, data.params, null, true)
      .then((res) => {
        book.value = res.data
        add({
          type: 'success',
          body: t('book_saved'),
        })
      })
      .catch(() => {
        add({
          type: 'error',
          body: t('error_saving_book'),
        })
      })
  }

  const sell = (id) => {
    return request('put', '/api/book/sell/' + id, null, null, true).then(
      (res) => {
        book.value = res.data
      }
    )
  }

  const remove = (id) => {
    return request('put', '/api/book/remove/' + id, null, null, true).then(
      (res) => {
        book.value = res.data
      }
    )
  }

  const getCover = (id) => {
    request('get', '/api/book/cover/' + id, null, null, true).then((res) => {
      cover.value = res.data
    })
  }

  const upload = (data) => {
    localConfig.value.headers['Content-Type'] = 'multipart/form-data'

    return request(
      'post',
      '/api/book/cover/' + data.id,
      data.form,
      null,
      true
    ).finally(() => {
      localConfig.value.headers['Content-Type'] = 'application/json'
    })
  }

  const removeCover = (id) => {
    request('delete', '/api/book/cover/' + id, null, null, true).then(() => {
      getCover(id)
    })
  }

  const found = (id) => {
    return request(
      'put',
      '/api/book/inventory/found/' + id,
      null,
      null,
      true
    ).then((res) => {
      book.value = res.data
    })
  }

  const notfound = (id) => {
    return request(
      'put',
      '/api/book/inventory/notfound/' + id,
      null,
      null,
      true
    ).then((res) => {
      book.value = res.data
    })
  }

  return {
    books,
    book,
    cover,
    find,
    show,
    create,
    update,
    sell,
    remove,
    getCover,
    upload,
    removeCover,
    found,
    notfound,
  }
}
