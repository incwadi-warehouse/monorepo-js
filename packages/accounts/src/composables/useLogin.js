import { ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import { useRouter } from 'vue-router'
import { useToken } from '@/composables/useToken.js'

export function useLogin() {
  const username = ref(null)
  const password = ref(null)

  const isLoggingIn = ref(false)
  const hasSuccess = ref(false)
  const hasError = ref(false)

  const { request } = useRequest()

  const router = useRouter()

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

        router.push({ name: 'account' })
      })
      .catch(() => {
        isLoggingIn.value = false
        hasSuccess.value = false
        hasError.value = true

        username.value = null
        password.value = null
      })
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
