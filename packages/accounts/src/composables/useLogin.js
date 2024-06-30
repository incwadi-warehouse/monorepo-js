import { ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import { useRouter, useRoute } from 'vue-router'
import { useToken } from '@/composables/useToken.js'
import { useRedirect } from '@/composables/useRedirect.js'

export function useLogin() {
  const username = ref(null)
  const password = ref(null)

  const isLoggingIn = ref(false)
  const hasSuccess = ref(false)
  const hasError = ref(false)

  const { request } = useRequest()

  const router = useRouter()
  const route = useRoute()

  const { persist, isAuthenticated } = useToken()

  const { redirect } = useRedirect({
    allowedHosts: import.meta.env.VUE_APP_REDIRECT_ALLOWED_HOSTS.split(','),
  })

  const redirectTo = route ? route.query.redirect : null

  if (isAuthenticated.value && redirectTo) {
    redirect(redirectTo)
  }

  const login = () => {
    isLoggingIn.value = true
    hasSuccess.value = false
    hasError.value = false

    return request('post', '/api/login_check', {
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        hasSuccess.value = true
        hasError.value = false

        const date = new Date()
        persist({
          token: res.data.token,
          refreshToken: res.data.refresh_token,
          tokenExpire: Math.floor(date.getTime() / 1000) + 60 * 60 * 24 * 7,
        })

        changeLocation()
      })
      .catch(() => {
        hasSuccess.value = false
        hasError.value = true
      })
      .finally(() => {
        isLoggingIn.value = false

        username.value = null
        password.value = null
      })
  }

  const changeLocation = () => {
    if (redirectTo) {
      const res = redirect(redirectTo)

      if (!res) router.push({ name: 'account' })

      return
    }

    router.push({ name: 'account' })
  }

  return {
    username,
    password,
    isLoggingIn,
    hasSuccess,
    hasError,
    login,
  }
}
