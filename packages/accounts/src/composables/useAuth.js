import { ref, watch } from 'vue'
import Cookies from 'js-cookie'
import { useRequest } from '@baldeweg/ui'

const token = ref(Cookies.get('token') || null)
const refreshToken = ref(Cookies.get('refresh_token') || null)
const user = ref(null)
const isAuthenticated = ref(false)

export function useAuth() {
  const { request } = useRequest()

  const username = ref(null)
  const password = ref(null)
  const isLoggingIn = ref(false)
  const interval = ref(undefined)
  const hasError = ref(false)

  const refresh = () => {
    return request('post', '/api/token/refresh', {
      refresh_token: Cookies.get('refresh_token'),
    })
      .then((res) => {
        isAuthenticated.value = true

        token.value = res.data.token
        refreshToken.value = res.data.refresh_token
        Cookies.set('token', res.data.token, { expires: 7 })
        Cookies.set('refresh_token', res.data.refresh_token, {
          expires: 30,
        })
        getUser()
      })
      .catch(() => {
        // logout()
      })
  }

  const getUser = () => {
    return request('get', '/api/me')
      .then((res) => {
        user.value = res.data
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // logout()
        }
      })
  }

  const setCheckInterval = () => {
    if (!Cookies.get('refresh_token')) return

    interval.value = setInterval(() => {
      if (!Cookies.get('token')) refresh()
    }, 30000)
  }

  const checkForRefresh = (from, to) => {
    if (from === null && typeof to === 'string') {
      if (!Cookies.get('token')) refresh()
      setCheckInterval()
    }

    if ((typeof from === 'string', to === null)) {
      interval.value = clearInterval(interval.value)
    }
  }

  const watchToken = () => {
    if (Cookies.get('token')) setCheckInterval()

    watch(token, (from, to) => {
      checkForRefresh(from, to)
    })
  }

  return {
    token,
    refreshToken,
    user,
    isAuthenticated,
    username,
    password,
    isLoggingIn,
    interval,
    hasError,
    refresh,
    getUser,
    checkForRefresh,
    watchToken,
  }
}
