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

  const redirectTo = route.query.redirect || null

  const login = () => {
    isLoggingIn.value = true
    hasSuccess.value = false
    hasError.value = false

    return request('post', '/api/login_check', {
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        isLoggingIn.value = false
        hasSuccess.value = true
        hasError.value = false

        username.value = null
        password.value = null

        const { persist } = useToken()

        const date = new Date()
        persist({
          token: res.data.token,
          refreshToken: res.data.refresh_token,
          tokenExpire: Math.floor(date.getTime() / 1000) + 60 * 60 * 24 * 7,
        })

        changeLocation()
      })
      .catch(() => {
        isLoggingIn.value = false
        hasSuccess.value = false
        hasError.value = true

        username.value = null
        password.value = null
      })
  }

  const changeLocation = () => {
    if (redirectTo) {
      const { redirect } = useRedirect({ allowedHosts: ['catalog'] })
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
