import { onMounted, ref } from 'vue'
import { useRequest } from '@/composables/useRequest'
import Cookies from 'js-cookie'

const announcements = ref([])

export function useAnnouncement() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const announcement = ref(null)
  const title = ref(null)
  const body = ref(null)

  const set = (data) => {
    announcement.value = data
  }

  const list = () => {
    return request('get', '/api/announcement/').then((res) => {
      announcements.value = res.data
    })
  }

  onMounted(list)

  const create = () => {
    return request('post', '/api/announcement/new', {
      title: title.value,
      body: body.value,
    }).then(() => {
      list()
      title.value = null
      body.value = null
    })
  }

  const update = () => {
    return request('put', '/api/announcement/' + announcement.value.id, {
      title: title.value,
      body: body.value,
    }).then(() => {
      list()
    })
  }

  const remove = () => {
    return request(
      'delete',
      '/api/announcement' + '/' + announcement.value.id
    ).then(() => {
      list()
    })
  }

  return {
    announcements,
    announcement,
    title,
    body,
    create,
    update,
    remove,
    set,
  }
}
