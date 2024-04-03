import { ref } from 'vue'
import { useRequest } from '@baldeweg/ui'

const articles = ref([])

export function useArticle() {
  const { config, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API

  const article = ref(null)
  const counter = ref(0)
  const isLoading = ref(false)

  const list = (term, page, genre) => {
    isLoading.value = true

    const params = {
      term: term,
      filter: [
        {
          field: 'branch',
          operator: 'eq',
          value: import.meta.env.VUE_APP_BRANCH,
        },
        {
          field: 'genre',
          operator: 'eq',
          value: genre,
        },
      ],
      orderBy: {
        article: [
          {
            field: 'added',
            direction: 'desc',
          },
        ],
      },
      offset: page * 20 - 20,
    }

    return request('get', '/api/public/book/find', null, {
      options: JSON.stringify(params),
    }).then((res) => {
      articles.value = res.data.books
      counter.value = res.data.counter
      isLoading.value = false
    })
  }

  const resetArticles = () => {
    articles.value = []
    counter.value = 0
  }

  const show = (id) => {
    return request('get', '/api/public/book/' + id).then((res) => {
      article.value = res.data
    })
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

  const image = (id, size) => {
    return (
      import.meta.env.VUE_APP_API +
      '/api/public/book/cover/' +
      id +
      '_' +
      size +
      '.jpg'
    )
  }

  return {
    articles,
    article,
    counter,
    isLoading,
    list,
    resetArticles,
    show,
    formatPrice,
    formatAuthor,
    image,
  }
}
