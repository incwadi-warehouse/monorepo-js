import { ref, watch } from 'vue'
import { useRequest } from '@baldeweg/ui'

const auth = ref(JSON.parse(sessionStorage.getItem('auth')))
const user = ref(null)

export function useToken() {
  const { request } = useRequest()

  const init = async () => {
    if (!auth.value) return (user.value = null)
    if (!auth.value.token) return refresh()

    const date = new Date()
    if (auth.value.tokenExpire < date / 1000) return refresh()

    if ((await isTokenValidOnServer()) === false) return refresh()

    getUser()
  }

  const watcher = () => {
    watch(auth, init)
  }

  const persist = (data) => {
    if (data && data.token && data.refreshToken && data.tokenExpire) {
      auth.value = data
      sessionStorage.setItem('auth', JSON.stringify(data))
    } else {
      auth.value = null
      sessionStorage.removeItem('auth')
    }
  }

  const refresh = () => {
    if (!auth.value || !auth.value.refreshToken) return persist(null)

    return request('post', '/api/token/refresh', {
      refresh_token: auth.value.refreshToken,
    })
      .then((res) => {
        const date = new Date()
        persist({
          token: res.data.token,
          refreshToken: res.data.refresh_token,
          tokenExpire: Math.floor(date.getTime() / 1000) + 60 * 60 * 24 * 7,
        })
      })
      .catch(() => {
        persist(null)
      })
  }

  const isTokenValidOnServer = async () => {
    const res = await request('get', '/api/me')

    return res.status === 200
  }

  const getUser = () => {
    return request('get', '/api/me').then((res) => {
      user.value = res.data
    })
  }

  return { auth, user, init, watcher, persist }
}
