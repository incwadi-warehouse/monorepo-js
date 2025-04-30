import { ref } from 'vue'
import { useRequest } from '@/composables/useRequest'

export function usePassword() {
  const { request } = useRequest()

  const password = ref(null)

  const isUpdating = ref(false)
  const hasSuccess = ref(false)
  const hasError = ref(false)

  const update = () => {
    isUpdating.value = true
    hasSuccess.value = false
    hasError.value = false

    return request('put', '/api/password', {
      password: password.value,
    })
      .then(() => {
        isUpdating.value = false

        hasSuccess.value = true
        hasError.value = false
        password.value = null
      })
      .catch(() => {
        isUpdating.value = false

        hasSuccess.value = false
        hasError.value = true
      })
  }

  return {
    password,
    isUpdating,
    hasSuccess,
    hasError,
    update,
  }
}
