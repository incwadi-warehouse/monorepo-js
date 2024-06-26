import { onMounted, reactive } from 'vue'
import Cookies from 'js-cookie'
import { useRequest } from '@baldeweg/ui'

export const state = reactive({
  username: null,
  password: null,
  me: null,
  isAuthenticated: false,
  isLoggingIn: false,
  isChangingPassword: false,
  interval: null,
  wrongCredentials: false,
  passwordSuccessful: false,
  passwordError: false,
})

export default function useAuth() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const login = () => {
    state.isLoggingIn = true

    return request('post', '/api/login_check', {
      username: state.username,
      password: state.password,
    })
      .then((response) => {
        Cookies.set('token', response.data.token, { expires: 7 })
        Cookies.set('refresh_token', response.data.refresh_token, {
          expires: 30,
        })

        state.isAuthenticated = true
        state.username = null
        state.password = null

        // check()
      })
      .catch(() => {
        state.wrongCredentials = true
      })
      .finally(() => {
        state.isLoggingIn = false
      })
  }

  const logout = () => {
    window.clearInterval(state.interval)

    Cookies.remove('token')
    Cookies.remove('refresh_token')

    state.isAuthenticated = false
    state.me = null

    if (import.meta.env.MODE === 'development') return
    window.location.href = import.meta.env.VUE_APP_ACCOUNTS
  }

  const changePassword = () => {
    state.isChangingPassword = true

    return request('put', '/api/password', {
      password: state.password,
    })
      .then(() => {
        state.passwordSuccessful = true
        state.password = null
      })
      .catch(() => {
        state.passwordError = true
      })
      .finally(() => {
        state.isChangingPassword = false
      })
  }

  const refresh = () => {
    return request('post', '/api/token/refresh', {
      refresh_token: Cookies.get('refresh_token'),
    })
      .then((response) => {
        Cookies.set('token', response.data.token, { expires: 7 })
        Cookies.set('refresh_token', response.data.refresh_token, {
          expires: 30,
        })

        state.isAuthenticated = true
      })
      .catch(() => {
        logout()
      })
  }

  const session = () => {
    if (undefined !== Cookies.get('token')) {
      state.isAuthenticated = true
      me()
    }
    if (
      undefined === Cookies.get('token') &&
      undefined !== Cookies.get('refresh_token')
    ) {
      refresh()
    }
    if (
      undefined === Cookies.get('token') &&
      undefined === Cookies.get('refresh_token')
    ) {
      logout()
    }
  }

  const me = () => {
    return request('get', '/api/me')
      .then((response) => {
        state.me = response.data
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logout()
        }
      })
  }

  onMounted(me)

  const check = () => {
    session()
    state.interval = window.setInterval(() => {
      session()
    }, 30000)
  }

  onMounted(check)

  return {
    state,
    me,
    login,
    logout,
    changePassword,
  }
}
