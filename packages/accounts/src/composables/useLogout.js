import { useRouter } from 'vue-router'
import { useToken } from '@/composables/useToken.js'

export function useLogout() {
  const router = useRouter()

  const logout = () => {
    const { persist } = useToken()

    persist(null)

    router.push({ name: 'login' })
  }

  return {
    logout,
  }
}
