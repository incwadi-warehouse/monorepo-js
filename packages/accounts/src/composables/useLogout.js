import { useToken } from '@/composables/useToken.js'

export function useLogout() {
  const logout = () => {
    const { persist } = useToken()

    persist(null)
  }

  return {
    logout,
  }
}
