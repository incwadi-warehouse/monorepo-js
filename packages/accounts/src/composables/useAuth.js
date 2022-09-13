import { ref } from 'vue'

export function useAuth() {
  const token = ref(null)

  const login = () => {}

  const logout = () => {}

  return { token, login, logout }
}
