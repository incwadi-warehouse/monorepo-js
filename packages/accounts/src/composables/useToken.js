import { computed, ref, watch } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

const auth = ref(JSON.parse(Cookies.get('auth') || null))
const user = ref(null)

export function useToken(config) {
  const { request, setAuthHeader } = useRequest()

  const isAuthenticated = computed(() => {
    return auth.value && user
  })

  const init = async () => {
    if (!auth.value) return (user.value = null)
    if (!auth.value.token) return refresh()

    setAuthHeader(auth.value.token)

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
      Cookies.set('auth', JSON.stringify(data))
      setAuthHeader(data.token)
    } else {
      auth.value = null
      Cookies.remove('auth')
      setAuthHeader(null)
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

  if (config && config.init) init()
  if (config && config.watch) watcher()

  return { auth, user, isAuthenticated, init, watcher, persist }
}
